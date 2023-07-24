import { useEffect, useState } from "react";
import { RootState } from "../../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setAllShop } from "../../../../redux/reducers/allShopSlice";
import { waitForTransaction } from "@wagmi/core";
import * as LitJsSdk from "@lit-protocol/lit-node-client";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
} from "wagmi";
import {
  ACCEPTED_TOKENS,
  LISTENER_FULFILLMENT,
  LISTENER_MARKET,
  LISTENER_ORACLE,
} from "../../../../lib/constants";
import { BigNumber, ethers } from "ethers";
import ListenerMarketAbi from "./../../../../abi/ListenerMarket.json";
import ListenerOracleAbi from "./../../../../abi/ListenerOracle.json";
import ListenerFulfillerAbi from "./../../../../abi/ListenerFulfiller.json";
import { setCartItems } from "../../../../redux/reducers/cartItemsSlice";
import { setLitClient } from "../../../../redux/reducers/litClientSlice";
import { setPurchaseModal } from "../../../../redux/reducers/purchaseModalSlice";

const useShop = () => {
  const dispatch = useDispatch();
  const { address: addressConnected, isConnected } = useAccount();
  const { chain } = useNetwork();
  const allShopItems = useSelector(
    (state: RootState) => state.app.allShopReducer.value
  );
  const cartItems = useSelector(
    (state: RootState) => state.app.cartItemsReducer.value
  );
  const litClient = useSelector(
    (state: RootState) => state.app.litClientReducer.value
  );
  const walletConnected = useSelector(
    (state: RootState) => state.app.walletConnectedReducer.value
  );
  const [checkOutOpen, setCheckoutOpen] = useState<boolean>(true);
  const [shopLoading, setShopLoading] = useState<boolean>(false);
  const [purchaseLoading, setPurchaseLoading] = useState<boolean>(false);
  const [currentIndexItem, setCurrentIndexItem] = useState<number[]>(
    Array.from(
      {
        length: cartItems?.length,
      },
      () => 0
    )
  );
  const [fulfillerAddress, setFulfillerAddress] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [switchNeeded, setSwitchNeeded] = useState<boolean>(false);
  const [approved, setApproved] = useState<boolean>(false);
  const [address, setAddress] = useState<boolean>(false);
  const [oracleValue, setOracleValue] = useState<number>(1);
  const [checkoutCurrency, setCheckoutCurrency] = useState<string>("USDT");
  const [encryptedFulfillmentDetails, setEncryptedFulfillmentDetails] =
    useState<string>("");
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

  const { data: oracleData } = useContractRead({
    address: LISTENER_ORACLE,
    abi: ListenerOracleAbi,
    functionName: "getRateByAddress",
    args: [
      ACCEPTED_TOKENS.find(([_, token]) => token === checkoutCurrency)?.[2],
    ],
    enabled: Boolean(
      ACCEPTED_TOKENS.find(([_, token]) => token === checkoutCurrency)?.[2]
    ),
  });

  const { data: fulfillmentData, error: fulfillerError } = useContractRead({
    address: LISTENER_FULFILLMENT,
    abi: ListenerFulfillerAbi,
    functionName: "getFulfillerAddress",
    args: [1],
  });

  const { data, error } = useContractRead({
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
    enabled:
      Boolean(address) &&
      Boolean(approved) &&
      Boolean(checkoutCurrency) &&
      Boolean(cartItems?.length > 0),
  });

  const { config } = usePrepareContractWrite({
    address: ACCEPTED_TOKENS.find(
      ([_, token]) => token === checkoutCurrency
    )?.[2]! as `0x${string}`,
    abi:
      checkoutCurrency === "MONA"
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
          ],
    functionName: "approve",
    args: [
      LISTENER_MARKET,
      ethers.utils.parseEther(totalAmount.toString() || "0"),
    ],
    enabled: Boolean(!Number.isNaN(totalAmount)),
    value: 0 as any,
  });

  const { config: buyNFTConfig, isSuccess } = usePrepareContractWrite({
    address: LISTENER_MARKET,
    abi: ListenerMarketAbi,
    args: [
      {
        preRollIds: cartItems?.reduce((accumulator: number[], item) => {
          accumulator.push(Number(item.collectionId));
          return accumulator;
        }, []),
        preRollAmounts: cartItems?.reduce((accumulator: number[], item) => {
          accumulator.push(Number(item.amount));
          return accumulator;
        }, []),
        customIds: [],
        customAmounts: [],
        customURIs: [],
        fulfillmentDetails: encryptedFulfillmentDetails,
        chosenTokenAddress: ACCEPTED_TOKENS.find(
          ([_, token]) => token === checkoutCurrency
        )?.[2],
      },
    ],
    functionName: "buyTokens",
    enabled: Boolean(
      cartItems?.length > 0 && encryptedFulfillmentDetails !== ""
    ),
  });

  const { writeAsync } = useContractWrite(config as any);
  const { writeAsync: buyNFTAsync } = useContractWrite(buyNFTConfig);

  const getTotalAmount = () => {
    if (cartItems.length < 1) {
      setTotalAmount(0);
    } else {
      const total = cartItems?.reduce(
        (accumulator, currentItem) =>
          accumulator + (currentItem.price * currentItem.amount) / 10 ** 18,
        0
      );

      if (oracleData) {
        const oracle = Number(oracleData as BigNumber) / 10 ** 18;
        setOracleValue(oracle);
        setTotalAmount(Number(total) / Number(oracle));
      }
    }
  };

  const purchaseItems = async () => {
    setPurchaseLoading(true);
    try {
      let client: LitJsSdk.LitNodeClient | undefined;
      if (!litClient) {
        client = await connectLit();
      }
      const authSig = await LitJsSdk.checkAndSignAuthMessage({
        chain: "mumbai",
      });
      const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(
        JSON.stringify(fulfillmentDetails)
      );
      await (client ? client : litClient).saveEncryptionKey({
        accessControlConditions: [
          {
            contractAddress: "",
            standardContractType: "",
            chain: "mumbai",
            method: "",
            parameters: [":userAddress", fulfillerAddress],
            returnValueTest: {
              comparator: "=",
              value: address,
            },
          },
        ],
        symmetricKey,
        authSig,
        chain: "mumbai",
      });
      const buffer = await encryptedString.arrayBuffer();
      const decoder = new TextDecoder();
      setEncryptedFulfillmentDetails(decoder.decode(buffer));
    } catch (err: any) {
      console.error(err.message);
    }
    setPurchaseLoading(false);
  };

  const handleApproveSpend = async () => {
    setPurchaseLoading(true);
    try {
      const tx = await writeAsync?.();
      const res = await waitForTransaction({
        hash: tx?.hash!,
      });
      if (res.status === "success") {
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
      const allShopValues = [
        {
          uri: {
            images: [
              "ipfs://QmXnZvpUJaRJqZyG2EYzpGuB8yk3HrqEFs945pScvsZaVV",
              "ipfs://QmUF1A5VHb9EbtU9HaFNpgw3f9RPR7tSpY8MchaxyEKNCd",
            ],
            description: "this is a description for the token that i have here",
          },
          acceptedTokens: [],
          prices: ["1000000", "3000000"],
          amount: "10",
          noLimit: false,
          mintedTokens: ["1", "2"],
          collectionId: "1",
          tokenIds: ["1", "2", "3", "4", "5"],
          name: "shop 1",
        },
        {
          uri: {
            images: [
              "ipfs://QmdwN9emrCjhaURLWDqi1T5jJKQS9nfuBVN1iBr6jwm61R",
              "ipfs://QmUF1A5VHb9EbtU9HaFNpgw3f9RPR7tSpY8MchaxyEKNCd",
            ],
            description: "this is a description for the token that i have here",
          },
          acceptedTokens: [],
          prices: ["1000000", "3000000"],

          amount: "10",
          noLimit: false,
          mintedTokens: ["1", "2"],
          collectionId: "1",
          tokenIds: ["1", "2", "3", "4", "5"],
          name: "shop 2",
        },
        {
          uri: {
            images: [
              "ipfs://QmbNUCcFqdmobTJzPA5gKkk71tERReB1MXcNyUjeQ53yVy",
              "ipfs://QmUF1A5VHb9EbtU9HaFNpgw3f9RPR7tSpY8MchaxyEKNCd",
            ],
            description: "this is a description for the token that i have here",
          },
          amount: "10",
          noLimit: true,
          mintedTokens: ["1", "2"],
          collectionId: "1",
          tokenIds: ["1", "2", "3", "4", "5"],
          name: "shop 3",
          acceptedTokens: [],
          prices: ["1000000", "3000000"],
        },
        {
          uri: {
            images: [
              "ipfs://QmXnZvpUJaRJqZyG2EYzpGuB8yk3HrqEFs945pScvsZaVV",
              "ipfs://QmUF1A5VHb9EbtU9HaFNpgw3f9RPR7tSpY8MchaxyEKNCd",
            ],
            description: "this is a description for the token that i have here",
          },
          acceptedTokens: [""],
          prices: ["1000000", "3000000"],
          amount: "10",
          noLimit: true,
          mintedTokens: ["1", "2"],
          collectionId: "1",
          tokenIds: ["1", "2", "3", "4", "5"],
          name: "shop 4",
        },
        {
          uri: {
            images: [
              "ipfs://QmdwN9emrCjhaURLWDqi1T5jJKQS9nfuBVN1iBr6jwm61R",
              "ipfs://QmUF1A5VHb9EbtU9HaFNpgw3f9RPR7tSpY8MchaxyEKNCd",
            ],
            description: "this is a description for the token that i have here",
          },
          acceptedTokens: [],
          prices: ["1000000", "3000000"],
          amount: "10",
          noLimit: false,
          mintedTokens: ["1", "2"],
          collectionId: "1",
          tokenIds: ["1", "2", "3", "4", "5"],
          name: "shop 1",
        },
        {
          uri: {
            images: [
              "ipfs://QmbNUCcFqdmobTJzPA5gKkk71tERReB1MXcNyUjeQ53yVy",
              "ipfs://QmUF1A5VHb9EbtU9HaFNpgw3f9RPR7tSpY8MchaxyEKNCd",
            ],
            description: "this is a description for the token that i have here",
          },
          acceptedTokens: [],
          prices: ["1000000", "3000000"],

          amount: "10",
          noLimit: false,
          mintedTokens: ["1", "2"],
          collectionId: "1",
          tokenIds: ["1", "2", "3", "4", "5"],
          name: "shop 2",
        },
        {
          uri: {
            images: [
              "ipfs://QmXnZvpUJaRJqZyG2EYzpGuB8yk3HrqEFs945pScvsZaVV",
              "ipfs://QmUF1A5VHb9EbtU9HaFNpgw3f9RPR7tSpY8MchaxyEKNCd",
            ],
            description: "this is a description for the token that i have here",
          },
          amount: "10",
          noLimit: true,
          mintedTokens: ["1", "2"],
          collectionId: "1",
          tokenIds: ["1", "2", "3", "4", "5"],
          name: "shop 3",
          acceptedTokens: [],
          prices: ["1000000", "3000000"],
        },
        {
          uri: {
            images: [
              "ipfs://QmXnZvpUJaRJqZyG2EYzpGuB8yk3HrqEFs945pScvsZaVV",
              "ipfs://QmUF1A5VHb9EbtU9HaFNpgw3f9RPR7tSpY8MchaxyEKNCd",
            ],
            description: "this is a description for the token that i have here",
          },
          acceptedTokens: [""],
          prices: ["1000000", "3000000"],
          amount: "10",
          noLimit: true,
          mintedTokens: ["1", "2"],
          collectionId: "1",
          tokenIds: ["1", "2", "3", "4", "5"],
          name: "shop 4",
        },
      ]?.map((obj) => {
        const modifiedObj = {
          ...obj,
          chosenSize: "M",
          sizes: ["XS", "S", "M", "L", "XL"],
        };

        return modifiedObj;
      });
      setCurrentIndexItem(
        Array.from({ length: allShopValues.length }, () => 0)
      );
      dispatch(setAllShop(allShopValues));
    } catch (err: any) {
      console.error(err.message);
    }
    setShopLoading(false);
  };

  const connectLit = async (): Promise<LitJsSdk.LitNodeClient | undefined> => {
    try {
      const client = new LitJsSdk.LitNodeClient({
        debug: false,
        alertWhenUnauthorized: false,
      });
      await client.connect();
      dispatch(setLitClient(client));
      return client;
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const writeTokens = async () => {
    setPurchaseLoading(true);
    try {
      const tx = await buyNFTAsync?.();
      const res = await waitForTransaction({
        hash: tx?.hash!,
      });
      if (res.status === "success") {
        dispatch(setCartItems([]));
        setFulfillmentDetails({
          name: "",
          contact: "",
          address: "",
          zip: "",
          city: "",
          state: "",
        });
        setEncryptedFulfillmentDetails("");
        dispatch(setPurchaseModal(true));
      }
    } catch (err: any) {
      console.error(err.message);
    }
    setPurchaseLoading(false);
  };

  useEffect(() => {
    if (encryptedFulfillmentDetails !== "" && isSuccess) {
      writeTokens();
    }
  }, [encryptedFulfillmentDetails]);

  useEffect(() => {
    if (allShopItems?.length < 1 || !allShopItems) {
      getAllShop();
    }
  }, []);

  useEffect(() => {
    setAddress(Boolean(addressConnected));
  }, [addressConnected, walletConnected]);

  useEffect(() => {
    if (address) {
      if (Number(data as BigNumber) / 10 ** 18 >= totalAmount) {
        setApproved(true);
      } else {
        setApproved(false);
      }
    }
  }, [
    address,
    totalAmount,
    cartItems?.reduce(
      (accumulator, currentItem) =>
        accumulator + (currentItem.price * currentItem.amount) / 10 ** 18,
      0
    ),
    data,
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

  useEffect(() => {
    console.log(fulfillmentData, fulfillerError);
  }, [fulfillmentData]);

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
    currentIndexItem,
    setCurrentIndexItem,
    checkOutOpen,
    setCheckoutOpen,
  };
};

export default useShop;
