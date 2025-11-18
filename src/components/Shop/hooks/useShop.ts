import { useContext, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import {
  ACCEPTED_TOKENS,
  DIGITALAX_ADDRESS,
  DIGITALAX_PUBLIC_KEY,
  LISTENER_OPEN_ACTION,
} from "../../../../lib/constants";
import { getAllCollections } from "../../../../graphql/subgraph/queries/getCollections";
import { createPublicClient, createWalletClient, custom, http } from "viem";
import { CartItem } from "../types/shop.types";
import findBalance from "../../../../lib/helpers/findBalance";
import { Details } from "@/components/Account/types/account.types";
import { ModalContext } from "@/pages/_app";
import { executePostAction } from "@lens-protocol/client/actions";
import { ethers } from "ethers";
import { blockchainData } from "@lens-protocol/client";
import { chains } from "@lens-chain/sdk/viem";
import {
  encryptForMultipleRecipients,
  getPublicKeyFromSignature,
} from "../../../../lib/helpers/encryption";

const useShop = () => {
  const context = useContext(ModalContext);
  const publicClient = createPublicClient({
    chain: chains.mainnet,
    transport: http("https://rpc.lens.xyz"),
  });
  const coder = new ethers.AbiCoder();
  const { address } = useAccount();
  const [checkOutOpen, setCheckoutOpen] = useState<boolean>(true);
  const [shopLoading, setShopLoading] = useState<boolean>(false);
  const [purchaseLoading, setPurchaseLoading] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [approved, setApproved] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [checkoutCurrency, setCheckoutCurrency] = useState<string>("USDT");
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
      fulfillmentDetails?.state?.trim() === "" ||
      fulfillmentDetails?.zip?.trim() === "" ||
      fulfillmentDetails?.country?.trim() === ""
    )
      return;
    try {
      let encryptedItems: string[] = [];

      const clientWallet = createWalletClient({
        chain: chains.mainnet,
        transport: custom((window as any).ethereum),
      });

      const message = "Sign this message to encrypt your fulfillment details";
      const signature = await clientWallet.signMessage({
        account: address,
        message,
      });

      const buyerPublicKey = await getPublicKeyFromSignature(
        message,
        signature
      );

      await Promise.all(
        cartItems?.map(async (item) => {
          const encryptedData = await encryptForMultipleRecipients(
            {
              ...fulfillmentDetails,
              size: item?.chosenSize,
              origin: "2",
              fulfillerAddress: [DIGITALAX_ADDRESS],
            },
            [
              { address, publicKey: buyerPublicKey },
              { address: DIGITALAX_ADDRESS, publicKey: DIGITALAX_PUBLIC_KEY },
            ]
          );

          const ipfsRes = await fetch("/api/ipfs", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(encryptedData),
          });
          const json = await ipfsRes.json();

          encryptedItems.push("ipfs://" + json?.cid);
        })
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
              context?.oracleData?.find(
                (oracle) =>
                  oracle.currency ===
                  ACCEPTED_TOKENS?.find(
                    (item) => item?.[1] == checkoutCurrency
                  )?.[2]?.toLowerCase()
              )?.wei
            ) >=
          Number(
            cartItems?.reduce(
              (accumulator, item) =>
                accumulator + item?.chosenAmount * Number(item?.item?.price),
              0
            )
          ) /
            Number(
              context?.oracleData?.find(
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
            )
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
        chain: chains.mainnet,
        transport: custom((window as any).ethereum),
      });

      const { request } = await publicClient.simulateContract({
        address: ACCEPTED_TOKENS?.find(
          (item) => item?.[1]?.toLowerCase() == checkoutCurrency?.toLowerCase()
        )?.[2]?.toLowerCase() as `0x${string}`,
        abi: [
          {
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
        chain: chains.mainnet,
        args: [
          LISTENER_OPEN_ACTION,
          ((Number(
            cartItems?.reduce(
              (accumulator, item) =>
                accumulator + item?.chosenAmount * Number(item?.item?.price),
              0
            )
          ) /
            Number(
              context?.oracleData?.find(
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
    if (!context?.lensConectado?.sessionClient) return;

    setPurchaseLoading(true);

    const encryptedFulfillment = await encryptFulfillment();

    if (!encryptFulfillment) {
      setPurchaseLoading(false);
      return;
    }

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
          cartItems?.reduce(
            (accumulator, item) =>
              accumulator + item?.chosenAmount * Number(item?.item?.price),
            0
          )
        ) /
          Number(
            context?.oracleData?.find(
              (oracle) =>
                oracle.currency?.toLowerCase() ===
                ACCEPTED_TOKENS?.find(
                  (item) => item?.[1] == checkoutCurrency
                )?.[2]?.toLowerCase()
            )?.rate
          )) *
          Number(
            context?.oracleData?.find(
              (oracle) =>
                oracle.currency?.toLowerCase() ===
                ACCEPTED_TOKENS?.find(
                  (item) => item?.[1] == checkoutCurrency
                )?.[2]?.toLowerCase()
            )?.wei
          )
      ) {
        context?.setGeneralModal({
          open: true,
          message: "Pockets Empty. Need to top up?",
          image: "QmSUH38BqmfPci9NEvmC2KRQEJeoyxdebHiZi1FABbtueg",
        });

        setPurchaseLoading(false);
        return;
      }

      const res = await executePostAction(
        context?.lensConectado?.sessionClient,
        {
          post: cartItems?.[0]?.item?.postId,
          action: {
            unknown: {
              address: LISTENER_OPEN_ACTION,
              params: [
                {
                  key: ethers.keccak256(
                    ethers.toUtf8Bytes("lens.param.buyListener")
                  ),
                  data: blockchainData(
                    coder.encode(
                      ["string[]", "address[]", "uint256[]", "uint8[]"],
                      [
                        encryptedFulfillment,
                        Array.from({ length: cartItems?.length }, () =>
                          Number(checkoutCurrency)
                        ),
                        cartItems?.map((item) =>
                          Number(item?.item?.collectionId)
                        ),
                        cartItems?.map((item) => item?.chosenAmount),
                      ]
                    )
                  ),
                },
              ],
            },
          },
        }
      );

      if (res.isErr() || !(res.value as any)?.raw) {
        context?.setGeneralModal({
          open: true,
          message: "Something went wrong :/ Try again?",
          image: "Qmam45hAbVeeq4RaJ2Dz4kTw7iea42rmvrgJySJBdSJuFS",
        });
        setPurchaseLoading(false);
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);

      const signer = await provider.getSigner();

      const tx = {
        chainId: (res.value as any)?.raw?.chainId,
        from: (res.value as any)?.raw?.from,
        to: (res.value as any)?.raw?.to,
        nonce: (res.value as any)?.raw?.nonce,
        gasLimit: (res.value as any)?.raw?.gasLimit,
        maxFeePerGas: (res.value as any)?.raw?.maxFeePerGas,
        maxPriorityFeePerGas: (res.value as any)?.raw?.maxPriorityFeePerGas,
        value: (res.value as any)?.raw?.value,
        data: (res.value as any)?.raw?.data,
      };
      const txResponse = await signer.sendTransaction(tx);
      await txResponse.wait();

      setFulfillmentDetails({
        name: "",
        address: "",
        zip: "",
        city: "",
        state: "",
        country: "",
      });

      context?.setGeneralModal({
        open: true,
        message:
          "Checkout success! Stay up to date with fulfillment progress on your Account page.",
        image: "Qmam45hAbVeeq4RaJ2Dz4kTw7iea42rmvrgJySJBdSJuFS",
      });
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
      const allShopValues = data?.data?.collectionCreateds?.map((obj: any) => ({
        ...obj,
        metadata: {
          ...obj.metadata,
          sizes:
            typeof obj?.metadata?.sizes === "string"
              ? (obj?.metadata?.sizes as any)
                  ?.split(",")
                  ?.map((word: string) => word.trim())
                  ?.filter((word: string) => word.length > 0)
              : obj?.metadata?.sizes,
          colors:
            typeof obj?.metadata?.colors === "string"
              ? (obj?.metadata?.colors as any)
                  ?.split(",")
                  ?.map((word: string) => word.trim())
                  ?.filter((word: string) => word.length > 0)
              : obj?.metadata?.colors,
        },
      }));

      context?.setCurrentIndexItem(
        Array.from({ length: allShopValues.length }, () => 0)
      );

      context?.setAllShop(allShopValues);
    } catch (err: any) {
      console.error(err.message);
    }
    setShopLoading(false);
  };

  useEffect(() => {
    if (Number(context?.allShop?.length) < 1 || !context?.allShop) {
      getAllShop();
    }
  }, []);

  useEffect(() => {
    if (address && checkoutCurrency) {
      checkApproved();
    }
  }, [checkoutCurrency, address]);

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
    currentIndex,
    setCurrentIndex,
    checkOutOpen,
    setCheckoutOpen,
    cartItems,
    setCartItems,
  };
};

export default useShop;
