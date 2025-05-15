import { useContext, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { getOrders } from "../../../../graphql/subgraph/queries/getOrders";
import { EncryptedDetails } from "../types/account.types";
import { ModalContext } from "@/pages/_app";
import {
  checkAndSignAuthMessage,
  LitNodeClient,
  uint8arrayToString,
} from "@lit-protocol/lit-node-client";
import { LIT_NETWORK } from "@lit-protocol/constants";
import { INFURA_GATEWAY, orderStatus } from "../../../../lib/constants";

const useOrder = () => {
  const client = new LitNodeClient({
    litNetwork: LIT_NETWORK.Datil,
    debug: false,
  });
  const { address } = useAccount();
  const context = useContext(ModalContext);
  const [ordersLoading, setOrdersLoading] = useState<boolean>(false);
  const [decryptLoading, setDecryptLoading] = useState<boolean>(false);

  const getAllOrders = async () => {
    setOrdersLoading(true);
    const res = await getOrders(address as string);
    if (!res || res?.data?.orderCreateds?.length < 1) {
      setOrdersLoading(false);
      return;
    }

    const ordersCleaned = await Promise.all(
      (res?.data?.orderCreateds || [])?.map(
        async (item: {
          totalPrice: string;
          status: string;
          details: string;
        }) => {
          if (item?.details) {
            const data = await fetch(
              `${INFURA_GATEWAY}/ipfs/${item?.details?.split("ipfs://")?.[1]}`
            );
            item.details = await data?.json();
          }

          return {
            ...item,
            totalPrice: String(Number(item?.totalPrice) / 10 ** 18),
            details: item?.details,
            status: orderStatus[Number(item?.status)],
            decrypted: false,
          };
        }
      )
    );

    context?.setSelectedOrderSidebar(ordersCleaned?.[0]);
    context?.setAllOrders(ordersCleaned);
    try {
    } catch (err: any) {
      console.error(err.message);
    }
    setOrdersLoading(false);
  };

  const decryptFulfillment = async (): Promise<void> => {
    setDecryptLoading(true);

    try {
      if (
        !(context?.selectedOrderSidebar?.details as EncryptedDetails)
          ?.ciphertext ||
        !(context?.selectedOrderSidebar?.details as EncryptedDetails)
          ?.dataToEncryptHash ||
        !address ||
        context?.selectedOrderSidebar?.decrypted
      ) {
        return;
      }

      let nonce = await client.getLatestBlockhash();
      const authSig = await checkAndSignAuthMessage({
        chain: "polygon",
        nonce,
      });
      await client.connect();

      const { decryptedData } = await client.decrypt({
        accessControlConditions: (
          context?.selectedOrderSidebar?.details as EncryptedDetails
        )?.accessControlConditions,
        ciphertext: (context?.selectedOrderSidebar?.details as EncryptedDetails)
          ?.ciphertext,
        dataToEncryptHash: (
          context?.selectedOrderSidebar?.details as EncryptedDetails
        )?.dataToEncryptHash,
        chain: "polygon",
        authSig,
      });

      const details = await JSON.parse(uint8arrayToString(decryptedData));

      const current = [...(context?.allOrders || [])];
      const index = context?.allOrders?.findIndex(
        (order) => order?.orderId == context?.selectedOrderSidebar?.orderId
      )!;

      current[index] = {
        ...current[index],
        details,
        decrypted: true,
      };

      context?.setAllOrders(current);
      context?.setSelectedOrderSidebar(current[index]);
    } catch (err: any) {
      console.error(err.message);
    }
    setDecryptLoading(false);
  };

  useEffect(() => {
    if (address && context?.switchAccount) {
      getAllOrders();
    }
  }, [address, context?.switchAccount]);

  return { ordersLoading, decryptFulfillment, decryptLoading };
};

export default useOrder;
