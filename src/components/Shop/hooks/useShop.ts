import { useEffect, useState } from "react";
import { RootState } from "../../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setAllShop } from "../../../../redux/reducers/allShopSlice";
import { checkAndSignAuthMessage } from "@lit-protocol/lit-node-client";
import { useAccount, useNetwork } from "wagmi";
import {
  ACCEPTED_TOKENS,
  LISTENER_OPEN_ACTION,
} from "../../../../lib/constants";
import { getAllCollections } from "../../../../graphql/subgraph/queries/getCollections";
import { createPublicClient, createWalletClient, custom, http } from "viem";
import { polygon } from "viem/chains";
import { setCurrentIndexItem } from "../../../../redux/reducers/currentIndexItemSlice";
import { CartItem } from "../types/shop.types";
import { encryptItems } from "../../../../lib/helpers/encryptItems";
import * as LitJsSdk from "@lit-protocol/lit-node-client";
import findBalance from "../../../../lib/helpers/findBalance";
import toHexWithLeadingZero from "../../../../lib/helpers/toHexWithLeadingZero";
import actPost from "../../../../lib/helpers/actPost";
import encodeActData from "../../../../lib/helpers/encodeActData";
import { setModalOpen } from "../../../../redux/reducers/modalOpenSlice";
import { Details } from "@/components/Account/types/account.types";

const useShop = () => {
  const publicClient = createPublicClient({
    chain: polygon,
    transport: http(),
  });
  const client = new LitJsSdk.LitNodeClient({
    litNetwork: "cayenne",
    debug: false,
  });

  const dispatch = useDispatch();
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const allShopItems = useSelector(
    (state: RootState) => state.app.allShopReducer.value
  );
  const lensConnected = useSelector(
    (state: RootState) => state.app.lensConnectedReducer?.profile
  );
  const oracleData = useSelector(
    (state: RootState) => state.app.oracleDataReducer?.data
  );
  const walletConnected = useSelector(
    (state: RootState) => state.app.walletConnectedReducer.value
  );
  const [checkOutOpen, setCheckoutOpen] = useState<boolean>(true);
  const [shopLoading, setShopLoading] = useState<boolean>(false);
  const [purchaseLoading, setPurchaseLoading] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [switchNeeded, setSwitchNeeded] = useState<boolean>(false);
  const [approved, setApproved] = useState<boolean>(false);
  const [checkoutCurrency, setCheckoutCurrency] = useState<string>("USDT");
  const [chosenItem, setChosenItem] = useState<CartItem | undefined>();
  const [fulfillmentDetails, setFulfillmentDetails] = useState<Details>({
    name: "",
    address: "",
    zip: "",
    city: "",
    state: "",
    country: "",
  });

  const encryptFulfillment = async () => {
    if (
      !address ||
      fulfillmentDetails?.address?.trim() === "" ||
      fulfillmentDetails?.city?.trim() === "" ||
      fulfillmentDetails?.name?.trim() === "" ||
      fulfillmentDetails?.state?.trim() === "" ||
      fulfillmentDetails?.zip?.trim() === "" ||
      fulfillmentDetails?.country?.trim() === ""
    )
      return;
    try {
      let nonce = client.getLatestBlockhash();

      const authSig = await checkAndSignAuthMessage({
        chain: "polygon",
        nonce: nonce!,
      });

      await client.connect();

      const encryptedItems = await encryptItems(
        client as any,
        {
          ...fulfillmentDetails,
          contact: lensConnected?.handle?.suggestedFormatted?.localName!,
          checkoutCurrency: ACCEPTED_TOKENS?.find(
            (item) => item?.[1] == checkoutCurrency
          )?.[2]?.toLowerCase() as string,
          chosenAmount: chosenItem?.chosenAmount!,
        },
        address as `0x${string}`,
        authSig,
        chosenItem!
      );

      return encryptedItems;
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const checkApproved = async () => {
    try {
      const data = await publicClient.readContract({
        address: ACCEPTED_TOKENS?.find(
          (item) => item?.[1] == checkoutCurrency
        )?.[2]?.toLowerCase() as `0x${string}`,
        abi: [
          {
            inputs: [
              {
                internalType: "address",
                name: "owner",
                type: "address",
              },
              {
                internalType: "address",
                name: "spender",
                type: "address",
              },
            ],
            name: "allowance",
            outputs: [
              {
                internalType: "uint256",
                name: "",
                type: "uint256",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
        ],
        functionName: "allowance",
        args: [address as `0x${string}`, LISTENER_OPEN_ACTION],
        account: address,
      });

      if (address) {
        if (
          Number((data as any)?.toString()) /
            Number(
              oracleData?.find(
                (oracle) =>
                  oracle.currency ===
                  ACCEPTED_TOKENS?.find(
                    (item) => item?.[1] == checkoutCurrency
                  )?.[2]?.toLowerCase()
              )?.wei
            ) >=
          (Number(
            Number(chosenItem?.item?.prices?.[0]) *
              Number(chosenItem?.chosenAmount) *
              10 ** 18
          ) /
            Number(
              oracleData?.find(
                (oracle) =>
                  oracle.currency ===
                  ACCEPTED_TOKENS.find(
                    (item) =>
                      item[2] ===
                      ACCEPTED_TOKENS?.find(
                        (item) => item?.[1] == checkoutCurrency
                      )?.[2]?.toLowerCase()
                  )?.[2]
              )?.rate
            )) *
            10 ** 18
        ) {
          setApproved(true);
        } else {
          setApproved(false);
        }
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const approveSpend = async () => {
    setPurchaseLoading(true);
    try {
      const clientWallet = createWalletClient({
        chain: polygon,
        transport: custom((window as any).ethereum),
      });

      const { request } = await publicClient.simulateContract({
        address: ACCEPTED_TOKENS?.find(
          (item) => item?.[1] == checkoutCurrency
        )?.[2]?.toLowerCase() as `0x${string}`,
        abi: [
          ACCEPTED_TOKENS?.find(
            (item) => item?.[1] == checkoutCurrency
          )?.[2]?.toLowerCase() === "0x6968105460f67c3bf751be7c15f92f5286fd0ce5"
            ? {
                inputs: [
                  {
                    internalType: "address",
                    name: "spender",
                    type: "address",
                  },
                  {
                    internalType: "uint256",
                    name: "tokens",
                    type: "uint256",
                  },
                ],
                name: "approve",
                outputs: [
                  { internalType: "bool", name: "success", type: "bool" },
                ],
                stateMutability: "nonpayable",
                type: "function",
              }
            : ACCEPTED_TOKENS?.find(
                (item) => item?.[1] == checkoutCurrency
              )?.[2]?.toLowerCase() ===
              "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270"
            ? {
                constant: false,
                inputs: [
                  { name: "guy", type: "address" },
                  { name: "wad", type: "uint256" },
                ],
                name: "approve",
                outputs: [{ name: "", type: "bool" }],
                payable: false,
                stateMutability: "nonpayable",
                type: "function",
              }
            : {
                inputs: [
                  {
                    internalType: "address",
                    name: "spender",
                    type: "address",
                  },
                  {
                    internalType: "uint256",
                    name: "amount",
                    type: "uint256",
                  },
                ],
                name: "approve",
                outputs: [
                  {
                    internalType: "bool",
                    name: "",
                    type: "bool",
                  },
                ],
                stateMutability: "nonpayable",
                type: "function",
              },
        ],
        functionName: "approve",
        chain: polygon,
        args: [
          LISTENER_OPEN_ACTION,
          ((Number(
            Number(chosenItem?.item?.prices?.[0]) *
              Number(chosenItem?.chosenAmount) *
              10 ** 18
          ) /
            Number(
              oracleData?.find(
                (oracle) =>
                  oracle.currency ===
                  ACCEPTED_TOKENS.find(
                    (item) =>
                      item[2] ===
                      ACCEPTED_TOKENS?.find(
                        (item) => item?.[1] == checkoutCurrency
                      )?.[2]?.toLowerCase()
                  )?.[2]
              )?.rate
            )) *
            10 ** 18 *
            1.3) as any,
        ],
        account: address,
      });
      const res = await clientWallet.writeContract(request);
      await publicClient.waitForTransactionReceipt({ hash: res });
      setApproved(true);
    } catch (err: any) {
      console.error(err.message);
    }
    setPurchaseLoading(false);
  };

  const collectItem = async () => {
    const encryptedFulfillment = await encryptFulfillment();

    setPurchaseLoading(true);
    try {
      const balance = await findBalance(
        publicClient,
        ACCEPTED_TOKENS?.find(
          (item) => item?.[1] == checkoutCurrency
        )?.[2]?.toLowerCase() as string,
        address as `0x${string}`
      );

      if (
        Number(balance) <
        (Number(
          Number(chosenItem?.item?.prices?.[0]) *
            Number(chosenItem?.chosenAmount) *
            10 ** 18
        ) /
          Number(
            oracleData?.find(
              (oracle) =>
                oracle.currency?.toLowerCase() ===
                ACCEPTED_TOKENS?.find(
                  (item) => item?.[1] == checkoutCurrency
                )?.[2]?.toLowerCase()
            )?.rate
          )) *
          Number(
            oracleData?.find(
              (oracle) =>
                oracle.currency?.toLowerCase() ===
                ACCEPTED_TOKENS?.find(
                  (item) => item?.[1] == checkoutCurrency
                )?.[2]?.toLowerCase()
            )?.wei
          )
      ) {
        dispatch(
          setModalOpen({
            actionOpen: true,
            actionMessage: "Pockets Empty. Need to top up?",
            actionImage: "QmSUH38BqmfPci9NEvmC2KRQEJeoyxdebHiZi1FABbtueg",
          })
        );

        setPurchaseLoading(false);
        return;
      }

      const clientWallet = createWalletClient({
        chain: polygon,
        transport: custom((window as any).ethereum),
      });

      const unknownOpenAction = encodeActData(
        [0],
        [Number(chosenItem?.chosenAmount || 1)],
        encryptedFulfillment?.[0]?.data!,
        ACCEPTED_TOKENS?.find(
          (item) => item?.[1] == checkoutCurrency
        )?.[2]?.toLowerCase() as `0x${string}`
      );

      const success = await actPost(
        `${toHexWithLeadingZero(
          Number(chosenItem?.item?.profileId)
        )}-${toHexWithLeadingZero(Number(chosenItem?.item?.pubId))}`,
        {
          unknownOpenAction,
        },
        dispatch,
        address as `0x${string}`,
        clientWallet,
        publicClient
      );
      setFulfillmentDetails({
        name: "",
        address: "",
        zip: "",
        city: "",
        state: "",
        country: "",
      });
      dispatch(
        setModalOpen({
          actionOpen: true,
          actionMessage:
            "Checkout success! Stay up to date with fulfillment progress on your Account page.",
          actionImage: "Qmam45hAbVeeq4RaJ2Dz4kTw7iea42rmvrgJySJBdSJuFS",
        })
      );
    } catch (err: any) {
      console.error(err.message);
    }

    setPurchaseLoading(false);
  };

  const getAllShop = async () => {
    setShopLoading(true);
    try {
      const data = await getAllCollections();

      if (
        !data?.data?.collectionCreateds ||
        data?.data?.collectionCreateds?.length < 1
      ) {
        setShopLoading(false);
        return;
      }
      const allShopValues = await Promise.all(
        data?.data?.collectionCreateds?.map(async (obj: any) => {
          const modifiedObj = {
            ...obj,
            prices: obj?.prices?.map((price: string) =>
              String(Number(price) / 10 ** 18)
            ),
            collectionMetadata: {
              ...obj.collectionMetadata,
              sizes:
                typeof obj?.collectionMetadata?.sizes === "string"
                  ? (obj?.collectionMetadata?.sizes as any)
                      ?.split(",")
                      ?.map((word: string) => word.trim())
                      ?.filter((word: string) => word.length > 0)
                  : obj?.collectionMetadata?.sizes,
              colors:
                typeof obj?.collectionMetadata?.colors === "string"
                  ? (obj?.collectionMetadata?.colors as any)
                      ?.split(",")
                      ?.map((word: string) => word.trim())
                      ?.filter((word: string) => word.length > 0)
                  : obj?.collectionMetadata?.colors,
            },
          };

          return modifiedObj;
        })
      );
      dispatch(
        setCurrentIndexItem(
          Array.from({ length: allShopValues.length }, () => 0)
        )
      );

      dispatch(setAllShop(allShopValues));
    } catch (err: any) {
      console.error(err.message);
    }
    setShopLoading(false);
  };

  useEffect(() => {
    if (allShopItems?.length < 1 || !allShopItems) {
      getAllShop();
    }
  }, []);

  useEffect(() => {
    setSwitchNeeded(chain?.id !== 137 ? true : false);
  }, [isConnected, walletConnected, chain?.id]);

  useEffect(() => {
    if (address && checkoutCurrency) {
      checkApproved();
    }
  }, [checkoutCurrency, lensConnected?.id, address]);

  return {
    shopLoading,
    purchaseLoading,
    collectItem,
    address,
    approveSpend,
    approved,
    setFulfillmentDetails,
    fulfillmentDetails,
    checkoutCurrency,
    setCheckoutCurrency,
    switchNeeded,
    currentIndex,
    setCurrentIndex,
    checkOutOpen,
    setCheckoutOpen,
    chosenItem,
    setChosenItem,
  };
};

export default useShop;
