import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import {
  getCollectionOrder,
  getOrderInformation,
  getOrders,
} from "../../../../graphql/subgraph/queries/getOrders";
import { useDispatch, useSelector } from "react-redux";
import { setAllOrders } from "../../../../redux/reducers/allOrdersSlice";
import { RootState } from "../../../../redux/store";
import { setSelectedOrderSideBar } from "../../../../redux/reducers/selectedOrderSideBarSlice";
import {
  checkAndSignAuthMessage,
  decryptToString,
} from "@lit-protocol/lit-node-client";
import * as LitJsSdk from "@lit-protocol/lit-node-client";
import { getCollectionId } from "../../../../graphql/subgraph/queries/getCollections";
import { fetchIpfsJson } from "../../../../lib/helpers/fetchIpfsJson";
import { EncryptedDetails } from "../types/account.types";

const useOrder = () => {
  const client = new LitJsSdk.LitNodeClient({
    litNetwork: "cayenne",
    debug: false,
  });
  const dispatch = useDispatch();
  const { address } = useAccount();
  const [ordersLoading, setOrdersLoading] = useState<boolean>(false);
  const [decryptLoading, setDecryptLoading] = useState<boolean>(false);
  const selectedOrderSideBar = useSelector(
    (state: RootState) => state.app.selectedOrderSideBarReducer.value
  );
  const allOrders = useSelector(
    (state: RootState) => state.app.allOrdersReducer.value
  );
  const switchAccount = useSelector(
    (state: RootState) => state.app.switchAccountReducer.value
  );

  const getAllOrders = async () => {
    setOrdersLoading(true);
    const res = await getOrders(address as string);
    if (!res || res?.data?.orderCreateds?.length < 1) {
      setOrdersLoading(false);
      return;
    }

    const promises = (res?.data?.orderCreateds || [])?.map(
      async (item: {
        orderId: string;
        totalPrice: string;
        currency: string;
        pubId: string;
        profileId: string;
        buyer: string;
        blockTimestamp: string;
        transactionHash: string;
        images: string[];
        names: string[];
        messages: string[];
        details: string;
        subOrderPrice: string[];
        subOrderStatus: string[];
        subOrderCollectionIds: string[];
        subOrderIsFulfilled: boolean[];
        subOrderAmount: string[];
      }) => ({
        ...item,
        totalPrice: String(Number(item?.totalPrice) / 10 ** 18),
        details: item?.details && (await JSON.parse(item?.details as string)),
        decrypted: false,
        subOrders: await Promise.all(
          item?.subOrderCollectionIds?.map(
            async (collectionId: string, index: number) => {
              const collection = await getCollectionOrder(collectionId);

              return {
                collection: {
                  name: collection?.data?.collectionCreateds?.[0]
                    ?.collectionMetadata?.title as string,
                  image: collection?.data?.collectionCreateds?.[0]
                    ?.collectionMetadata?.images?.[0]
                    ? collection?.data?.collectionCreateds?.[0]
                        ?.collectionMetadata?.images?.[0]
                    : (collection?.data?.collectionCreateds?.[0]
                        ?.collectionMetadata?.cover as string),
                  origin: collection?.data?.collectionCreateds?.[0]
                    ?.origin as string,
                  pubId: collection?.data?.collectionCreateds?.[0]
                    ?.pubId as string,
                },
                price: String(
                  Number(item?.subOrderPrice?.[index]) / 10 ** 18
                ) as string,
                status: item?.subOrderStatus?.[index] as string,
                isFulfilled: item?.subOrderIsFulfilled?.[index],
                fulfillerAddress: "",
                amount: item?.subOrderAmount?.[index] as string,
              };
            }
          )
        ),
      })
    );
    const awaited = await Promise.all(promises);
    dispatch(setSelectedOrderSideBar(awaited?.[0]));
    dispatch(setAllOrders(awaited));
    try {
    } catch (err: any) {
      console.error(err.message);
    }
    setOrdersLoading(false);
  };

  const getChosenOrder = async () => {
    setOrdersLoading(true);
    try {
      const res = await getOrderInformation(
        address as string,
        selectedOrderSideBar!.transactionHash
      );
      if (!res || res?.data?.orderCreateds?.length < 1) {
        setOrdersLoading(false);
        return;
      }
      const parsedInfo = JSON.parse(
        res?.data?.orderCreateds[0].fulfillmentInformation
      );
      let collectionDetails = [];
      for (
        let i = 0;
        i < res?.data?.orderCreateds[0].collectionIds?.length;
        i++
      ) {
        const coll = await getCollectionId(
          res?.data?.orderCreateds[0].collectionIds[i]
        );

        const uri = await fetchIpfsJson(
          coll?.data?.collectionCreateds[0]?.uri,
          true
        );

        collectionDetails.push({
          ...coll.data.collectionCreateds[0],
          uri,
        });
      }

      dispatch(
        setSelectedOrderSideBar({
          ...res?.data?.orderCreateds[0],
          fulfillmentInformation: {
            encryptedString: JSON.parse(parsedInfo.encryptedString),
            encryptedSymmetricKey: parsedInfo.encryptedSymmetricKey,
            decryptedFulfillment: undefined,
          },
          collectionDetails: collectionDetails,
        })
      );
    } catch (err: any) {
      console.error(err.message);
    }
    setOrdersLoading(false);
  };

  const decryptFulfillment = async (): Promise<void> => {
    setDecryptLoading(true);

    try {
      if (
        !(selectedOrderSideBar?.details as EncryptedDetails)?.ciphertext ||
        !(selectedOrderSideBar?.details as EncryptedDetails)
          ?.dataToEncryptHash ||
        !address ||
        selectedOrderSideBar?.decrypted
      ) {
        return;
      }

      const authSig = await checkAndSignAuthMessage({
        chain: "polygon",
      });

      await client.connect();

      const decryptedString = await decryptToString(
        {
          authSig,
          accessControlConditions: (
            selectedOrderSideBar?.details as EncryptedDetails
          ).accessControlConditions,
          ciphertext: (selectedOrderSideBar?.details as EncryptedDetails)
            .ciphertext,
          dataToEncryptHash: (selectedOrderSideBar?.details as EncryptedDetails)
            .dataToEncryptHash,
          chain: "polygon",
        },
        client!
      );

      const details = await JSON.parse(decryptedString);

      const current = [...allOrders];
      const index = allOrders?.findIndex(
        (order) => order?.orderId == selectedOrderSideBar?.orderId
      );

      current[index] = {
        ...current[index],
        details,
        subOrders: current[index]?.subOrders.map((item, index) => ({
          ...item,
          size: details.sizes[details.sizes.length - 1 - index],
          color: details.colors[details.colors.length - 1 - index],
        })),
        decrypted: true,
      };

      dispatch(setAllOrders(current));
      dispatch(setSelectedOrderSideBar(current[index]));
    } catch (err: any) {
      console.error(err.message);
    }
    setDecryptLoading(false);
  };

  useEffect(() => {
    if (selectedOrderSideBar && switchAccount && address) {
      getChosenOrder();
    }
  }, [selectedOrderSideBar, switchAccount, address]);

  useEffect(() => {
    if (address && switchAccount) {
      getAllOrders();
    }
  }, [address, switchAccount]);

  return { ordersLoading, decryptFulfillment, decryptLoading };
};

export default useOrder;
