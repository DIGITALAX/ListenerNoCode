import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import {
  getOrderInformation,
  getOrders,
} from "../../../../graphql/queries/getOrders";
import { useDispatch, useSelector } from "react-redux";
import { setAllOrders } from "../../../../redux/reducers/allOrdersSlice";
import { setSelectedOrderCircuit } from "../../../../redux/reducers/selectedOrderSlice";
import { RootState } from "../../../../redux/store";
import { setSelectedOrderSideBar } from "../../../../redux/reducers/selectedOrderSideBarSlice";
import {
  checkAndSignAuthMessage,
  decryptString,
} from "@lit-protocol/lit-node-client";
import { createPublicClient, http } from "viem";
import { polygon } from "viem/chains";
import { LISTENER_FULFILLMENT } from "../../../../lib/constants";
import { getCollectionId } from "../../../../graphql/queries/getCollections";
import { fetchIpfsJson } from "../../../../lib/helpers/fetchIpfsJson";

const useOrder = () => {
  const publicClient = createPublicClient({
    chain: polygon,
    transport: http(),
  });
  const dispatch = useDispatch();
  const { address } = useAccount();
  const [ordersLoading, setOrdersLoading] = useState<boolean>(false);
  const [decryptLoading, setDecryptLoading] = useState<boolean>(false);
  const selectedOrderSideBar = useSelector(
    (state: RootState) => state.app.selectedOrderSideBarReducer.value
  );
  const selectedOrder = useSelector(
    (state: RootState) => state.app.selectedOrderReducer.value
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
    dispatch(setSelectedOrderSideBar(res?.data?.orderCreateds[0]));
    dispatch(setAllOrders(res?.data?.orderCreateds));
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
        setSelectedOrderCircuit({
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

  const getFulfillerAddress = async (): Promise<string | undefined> => {
    try {
      const data = await publicClient.readContract({
        address: LISTENER_FULFILLMENT,
        abi: [
          {
            inputs: [
              {
                internalType: "uint256",
                name: "_fulfillerId",
                type: "uint256",
              },
            ],
            name: "getFulfillerAddress",
            outputs: [
              {
                internalType: "address",
                name: "",
                type: "address",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
        ],
        functionName: "getFulfillerAddress",
        args: [1],
      });

      return data as string | undefined;
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const decryptFulfillment = async (): Promise<void> => {
    if (
      !selectedOrder?.fulfillmentInformation?.encryptedSymmetricKey ||
      !selectedOrder?.fulfillmentInformation?.encryptedString ||
      !address
    ) {
      return;
    }
    setDecryptLoading(true);
    try {
      const client = new LitNodeClient({ debug: false });
      await client.connect();
      const authSig = await checkAndSignAuthMessage({
        chain: "polygon",
      });
      const fulfillerAddress = await getFulfillerAddress();
      if (fulfillerAddress) {
        const symmetricKey = await client.getEncryptionKey({
          accessControlConditions: [
            {
              contractAddress: "",
              standardContractType: "",
              chain: "polygon",
              method: "",
              parameters: [":userAddress"],
              returnValueTest: {
                comparator: "=",
                value: fulfillerAddress.toLowerCase(),
              },
            },
            {
              operator: "or",
            } as any,
            {
              contractAddress: "",
              standardContractType: "",
              chain: "polygon",
              method: "",
              parameters: [":userAddress"],
              returnValueTest: {
                comparator: "=",
                value: address as string,
              },
            },
          ],
          toDecrypt:
            selectedOrder?.fulfillmentInformation?.encryptedSymmetricKey!,
          authSig,
          chain: "polygon",
        });
        const uintString = new Uint8Array(
          selectedOrder?.fulfillmentInformation?.encryptedString!
        ).buffer;
        const blob = new Blob([uintString], { type: "text/plain" });
        const decryptedString = await decryptString(blob, symmetricKey);
        dispatch(
          setSelectedOrderCircuit({
            ...selectedOrder,
            fulfillmentInformation: {
              encryptedString:
                selectedOrder.fulfillmentInformation.encryptedString,
              encryptedSymmetricKey:
                selectedOrder.fulfillmentInformation.encryptedSymmetricKey,
              decryptedFulfillment: JSON.parse(decryptedString),
            },
          })
        );
      }
    } catch (err: any) {
      console.error(err);
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
