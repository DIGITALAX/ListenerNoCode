import { useEffect, useState } from "react";
import { RootState } from "../../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setAllShop } from "../../../../redux/reducers/allShopSlice";
import {
  checkAndSignAuthMessage,
  LitNodeClient,
  encryptString,
  uint8arrayToString,
} from "@lit-protocol/lit-node-client";
import { useAccount, useNetwork } from "wagmi";
import {
  ACCEPTED_TOKENS,
  LISTENER_FULFILLMENT,
  LISTENER_MARKET,
  LISTENER_ORACLE,
} from "../../../../lib/constants";
import { BigNumber, ethers } from "ethers";
import { setCartItems } from "../../../../redux/reducers/cartItemsSlice";
import { setPurchaseModal } from "../../../../redux/reducers/purchaseModalSlice";
import { getAllCollections } from "../../../../graphql/queries/getCollections";
import { createPublicClient, createWalletClient, custom, http } from "viem";
import { fetchIpfsJson } from "../../../../lib/helpers/fetchIpfsJson";
import { polygon } from "viem/chains";
import { setModalOpen } from "../../../../redux/reducers/modalOpenSlice";
import { setCurrentIndexItem } from "../../../../redux/reducers/currentIndexItemSlice";

const useShop = () => {
  const publicClient = createPublicClient({
    chain: polygon,
    transport: http(),
  });

  const dispatch = useDispatch();
  const { address: addressConnected, isConnected } = useAccount();
  const { chain } = useNetwork();
  const allShopItems = useSelector(
    (state: RootState) => state.app.allShopReducer.value
  );
  const cartItems = useSelector(
    (state: RootState) => state.app.cartItemsReducer.value
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
  const [address, setAddress] = useState<boolean>(false);
  const [oracleValue, setOracleValue] = useState<number>(1);
  const [checkoutCurrency, setCheckoutCurrency] = useState<string>("USDT");
  const [totalAmount, setTotalAmount] = useState<number>(
    cartItems?.length > 0
      ? cartItems?.reduce(
          (accumulator, currentItem) =>
            accumulator + (currentItem.price * currentItem.amount) / 10 ** 18,
          0
        )
      : 0
  );
  const [fulfillmentDetails, setFulfillmentDetails] = useState<{
    name: string;
    contact: string;
    address: string;
    zip: string;
    city: string;
    state: string;
  }>({
    name: "",
    contact: "",
    address: "",
    zip: "",
    city: "",
    state: "",
  });

  const getTotalAmount = async () => {
    if (cartItems.length < 1) {
      setTotalAmount(0);
    } else {
      const total = cartItems?.reduce(
        (accumulator, currentItem) =>
          accumulator + (currentItem.price * currentItem.amount) / 10 ** 18,
        0
      );

      const data = await publicClient.readContract({
        address: LISTENER_ORACLE,
        abi: [
          {
            inputs: [
              {
                internalType: "address",
                name: "_tokenAddress",
                type: "address",
              },
            ],
            name: "getRateByAddress",
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
        functionName: "getRateByAddress",
        args: [
          ACCEPTED_TOKENS.find(([_, token]) => token === checkoutCurrency)?.[2],
        ],
      });

      if (data) {
        const oracle = Number(data as BigNumber) / 10 ** 18;
        setOracleValue(oracle);
        setTotalAmount(Number(total) / Number(oracle));
      }
    }
  };

  const purchaseItems = async () => {
    setPurchaseLoading(true);
    try {
      const client = new LitNodeClient({
        debug: true,
        alertWhenUnauthorized: true,
        chain: 137,
        provider: `https://polygon-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
      });
      await client.connect();
      const authSig = await checkAndSignAuthMessage({
        chain: "polygon",
      });
      const { encryptedString, symmetricKey } = await encryptString(
        JSON.stringify(fulfillmentDetails)
      );
      const fulfillerAddress = allShopItems[0].fulfillerAddress;

      const encryptedSymmetricKey = await client!.saveEncryptionKey({
        accessControlConditions: [
          {
            contractAddress: "",
            standardContractType: "",
            chain: "polygon",
            method: "",
            parameters: [":userAddress"],
            returnValueTest: {
              comparator: "=",
              value: fulfillerAddress,
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
              value: addressConnected as string,
            },
          },
        ],
        symmetricKey,
        authSig: authSig,
        chain: "polygon",
      });

      const buffer = await encryptedString.arrayBuffer();

      const { request } = await publicClient.simulateContract({
        address: LISTENER_MARKET,
        abi: [
          {
            inputs: [
              {
                components: [
                  {
                    internalType: "uint256[]",
                    name: "listenerIds",
                    type: "uint256[]",
                  },
                  {
                    internalType: "uint256[]",
                    name: "listenerAmounts",
                    type: "uint256[]",
                  },
                  {
                    internalType: "uint256[]",
                    name: "chosenIndexes",
                    type: "uint256[]",
                  },
                  {
                    internalType: "string",
                    name: "fulfillmentDetails",
                    type: "string",
                  },
                  {
                    internalType: "address",
                    name: "chosenTokenAddress",
                    type: "address",
                  },
                ],
                internalType: "struct MarketParamsLibrary.MarketParams",
                name: "params",
                type: "tuple",
              },
            ],
            name: "buyTokens",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          } as any,
        ],
        functionName: "buyTokens",
        args: [
          {
            listenerIds: cartItems?.reduce((accumulator: number[], item) => {
              accumulator.push(Number(item.collectionId));
              return accumulator;
            }, []),
            listenerAmounts: cartItems?.reduce(
              (accumulator: number[], item) => {
                accumulator.push(Number(item.amount));
                return accumulator;
              },
              []
            ),
            chosenIndexes: Array.from({ length: cartItems.length }, () => 0),
            fulfillmentDetails: JSON.stringify({
              encryptedString: JSON.stringify(
                Array.from(new Uint8Array(buffer))
              ),
              encryptedSymmetricKey: uint8arrayToString(
                encryptedSymmetricKey,
                "base16"
              ),
            }),
            chosenTokenAddress: ACCEPTED_TOKENS.find(
              ([_, token]) => token === checkoutCurrency
            )?.[2],
          },
        ],
        account: addressConnected,
      });
      const clientWallet = createWalletClient({
        chain: polygon,
        transport: custom((window as any).ethereum),
      });
      const res = await clientWallet.writeContract(request);
      await publicClient.waitForTransactionReceipt({ hash: res });
      dispatch(setCartItems([]));
      setFulfillmentDetails({
        name: "",
        contact: "",
        address: "",
        zip: "",
        city: "",
        state: "",
      });
      dispatch(setPurchaseModal(true));
      await getAllShop();
    } catch (err: any) {
      dispatch(
        setModalOpen({
          actionOpen: true,
          actionMessage: "Pockets Empty? Try Again.",
          actionImage: "Qmf3knH67VUqS2icK5hbkSUqRTxCFdbfdZnyxWPrJVG5w4",
        })
      );
      console.error(err.message);
    }
    setPurchaseLoading(false);
  };

  const handleApproveSpend = async () => {
    setPurchaseLoading(true);
    try {
      const { request } = await publicClient.simulateContract({
        address: ACCEPTED_TOKENS.find(
          ([_, token]) => token === checkoutCurrency
        )?.[2]! as `0x${string}`,
        abi: (checkoutCurrency === "MONA"
          ? [
              {
                inputs: [
                  { internalType: "address", name: "spender", type: "address" },
                  { internalType: "uint256", name: "tokens", type: "uint256" },
                ],
                name: "approve",
                outputs: [
                  { internalType: "bool", name: "success", type: "bool" },
                ],
                stateMutability: "nonpayable",
                type: "function",
              },
            ]
          : checkoutCurrency === "WMATIC"
          ? [
              {
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
              },
            ]
          : [
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
            ]) as any,
        functionName: "approve",
        args: [
          LISTENER_MARKET,
          ethers.utils.parseEther(totalAmount.toString() || "0"),
        ],
        account: addressConnected,
      });
      const clientWallet = createWalletClient({
        chain: polygon,
        transport: custom((window as any).ethereum),
      });
      const res = await clientWallet.writeContract(request);
      await publicClient.waitForTransactionReceipt({ hash: res });
      if (res) {
        setApproved(true);
      }
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
          const uri = await fetchIpfsJson(obj.uri, true);

          const modifiedObj = {
            ...obj,
            chosenSize: "M",
            sizes: ["XS", "S", "M", "L", "XL"],
            uri,
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


  const getAddressApproved = async () => {
    try {
      const data = await publicClient.readContract({
        address: ACCEPTED_TOKENS.find(
          ([_, token]) => token === checkoutCurrency
        )?.[2] as `0x${string}`,
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
        args: [addressConnected as `0x${string}`, LISTENER_MARKET],
      });

      if (
        Number(data as BigNumber) /
          ((ACCEPTED_TOKENS.find(
            ([_, token]) => token === checkoutCurrency
          )?.[2] as `0x${string}`) ===
          "0xc2132d05d31c914a87c6611c10748aeb04b58e8f"
            ? 10 ** 6
            : 10 ** 18) >=
        totalAmount
      ) {
        setApproved(true);
      } else {
        setApproved(false);
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (allShopItems?.length < 1 || !allShopItems) {
      getAllShop();
    }
  }, []);

  useEffect(() => {
    setAddress(Boolean(addressConnected));
  }, [addressConnected, walletConnected]);

  useEffect(() => {
    getAddressApproved();
  }, [
    address,
    totalAmount,
    checkoutCurrency,
    cartItems?.reduce(
      (accumulator, currentItem) =>
        accumulator + (currentItem.price * currentItem.amount) / 10 ** 18,
      0
    ),
  ]);

  useEffect(() => {
    getTotalAmount();
  }, [
    checkoutCurrency,
    cartItems?.length,
    cartItems?.reduce(
      (accumulator, currentItem) =>
        accumulator + (currentItem.price * currentItem.amount) / 10 ** 18,
      0
    ),
  ]);

  useEffect(() => {
    setSwitchNeeded(chain?.id !== 137 ? true : false);
  }, [isConnected, walletConnected, chain?.id]);

  return {
    shopLoading,
    purchaseLoading,
    purchaseItems,
    address,
    handleApproveSpend,
    approved,
    oracleValue,
    setFulfillmentDetails,
    fulfillmentDetails,
    checkoutCurrency,
    setCheckoutCurrency,
    switchNeeded,
    currentIndex,
    setCurrentIndex,
    checkOutOpen,
    setCheckoutOpen,
  };
};

export default useShop;
