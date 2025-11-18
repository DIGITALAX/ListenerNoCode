import { useContext, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { getOrders } from "../../../../graphql/subgraph/queries/getOrders";
import { ModalContext } from "@/pages/_app";
import { INFURA_GATEWAY, orderStatus } from "../../../../lib/constants";
import { EncryptedData } from "../types/account.types";
import { decryptData } from "../../../../lib/helpers/encryption";

const useOrder = () => {
  const { address } = useAccount();
  const context = useContext(ModalContext);
  const [ordersLoading, setOrdersLoading] = useState<boolean>(false);
  const [decryptLoading, setDecryptLoading] = useState<boolean>(false);
  const [privateKey, setPrivateKey] = useState<string | null>(null);

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
        !(context?.selectedOrderSidebar?.details as EncryptedData)
          ?.ciphertext ||
        !(context?.selectedOrderSidebar?.details as EncryptedData)
          ?.dataToEncryptHash ||
        !address ||
        context?.selectedOrderSidebar?.decrypted
      ) {
        return;
      }

      let key = privateKey;

      if (!key) {
        const promptMessage =
          "Enter your wallet private key to decrypt your fulfillment details.\n\nThis interface is fully open source, runs entirely in your browser, and never stores your key. Make sure you are in a secure environment before entering it.";
        const promptValue = window.prompt(promptMessage);

        if (!promptValue) {
          return;
        }

        key = promptValue.trim();

        if (!key.startsWith("0x")) {
          key = `0x${key}`;
        }

        setPrivateKey(key);
      }

      const details = await decryptData(
        context?.selectedOrderSidebar?.details as EncryptedData,
        key,
        address
      );

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
