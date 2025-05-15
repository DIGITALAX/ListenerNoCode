import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/Layout/modules/Header";
import Footer from "../components/Layout/modules/Footer";
import { Chain, polygon } from "wagmi/chains";
import { createConfig, http, WagmiProvider } from "wagmi";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { chains } from "@lens-chain/sdk/viem";
import { MutableRefObject, SetStateAction, useEffect, useState } from "react";
import { createContext } from "react";
import Modals from "@/components/Modals/Modals";
import { useRouter } from "next/router";
import RouterChange from "@/components/Layout/modules/RouterChange";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { mainnet, PublicClient } from "@lens-protocol/client";
import { AllShop, OracleData } from "@/components/Shop/types/shop.types";
import { LensConectado } from "@/components/Layout/types/layout.types";
import { AllEntries } from "@/components/Actions/types/actions.types";
import {
  AllCircuits,
  Order,
  SelectedCircuit,
} from "@/components/Account/types/account.types";
import {
  ContractAction,
  ContractCondition,
  FetchAction,
  WebhookCondition,
} from "@/components/CircuitFlow/types/litlistener.types";
import { CircuitInformation } from "@/components/CircuitFlow/types/circuitflow.types";

const queryClient = new QueryClient();

export const chronicle: Chain = {
  id: 175177,
  name: "Chronicle - Lit Protocol Testnet",

  nativeCurrency: {
    decimals: 18,
    name: "LIT",
    symbol: "LIT",
  },
  rpcUrls: {
    public: { http: ["https://chain-rpc.litprotocol.com/http"] },
    default: { http: ["https://chain-rpc.litprotocol.com/http"] },
  },
  blockExplorers: {
    etherscan: {
      name: "Caldera Explorer",
      url: "https://chain.litprotocol.com/",
    },
    default: {
      name: "Caldera Explorer",
      url: "https://chain.litprotocol.com/",
    },
  },
} as const;

export const wagmiConfig = createConfig(
  getDefaultConfig({
    appName: "Lit Listener",
    walletConnectProjectId: process.env
      .NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string,
    appUrl: "https://listener.irrevocable.dev",
    appIcon: "https://listener.irrevocable.dev/favicon.ico",
    chains: [chains.mainnet, chronicle, polygon],
    transports: {
      [chains.mainnet.id]: http("https://rpc.lens.xyz"),
      [chronicle.id]: http("https://chain-rpc.litprotocol.com/http"),
      [polygon.id]: http(
        `https://polygon-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
      ),
    },
    ssr: true,
  })
);

export const ScrollContext = createContext<
  MutableRefObject<HTMLDivElement | null>
>(null!);

export const ModalContext = createContext<
  | {
      switchAccount: boolean;
      setSwitchAccount: (e: SetStateAction<boolean>) => void;
      generalModal: {
        open: boolean;
        message: string;
        image: string;
      };
      setGeneralModal: (
        e: SetStateAction<{
          open: boolean;
          message: string;
          image: string;
        }>
      ) => void;
      oracleData: OracleData[];
      setOracleData: (e: SetStateAction<OracleData[]>) => void;
      lensClient: PublicClient | undefined;
      lensConectado: LensConectado | undefined;
      setLensConectado: (e: SetStateAction<LensConectado | undefined>) => void;
      purchaseModal: boolean;
      setPurchaseModal: (e: SetStateAction<boolean>) => void;
      previewCondition: {
        open: boolean;
        message: string;
      };
      setPreviewCondition: (
        e: SetStateAction<{
          open: boolean;
          message: string;
        }>
      ) => void;
      circuitInformation: CircuitInformation;
      currentIndexItem: number[];
      setCurrentIndexItem: (e: SetStateAction<number[]>) => void;
      setCircuitInformation: (e: SetStateAction<CircuitInformation>) => void;
      actionFlow: {
        index: number;
        fetchCount: number;
        contractCount: number;
      };
      setActionFlow: (
        e: SetStateAction<{
          index: number;
          fetchCount: number;
          contractCount: number;
        }>
      ) => void;
      allEntries: AllEntries[];
      setAllEntries: (e: SetStateAction<AllEntries[]>) => void;
      allOrders: Order[];
      setAllOrders: (e: SetStateAction<Order[]>) => void;
      allShop: AllShop[];
      setAllShop: (e: SetStateAction<AllShop[]>) => void;
      allUserCircuits: AllCircuits[];
      setAllUserCircuits: (e: SetStateAction<AllCircuits[]>) => void;
      circuitFlow: number;
      setCircuitFlow: (e: SetStateAction<number>) => void;
      circuitRunning: boolean;
      setCircuitRunning: (e: SetStateAction<boolean>) => void;
      conditionFlow: {
        index: number;
        webhookCount: number;
        contractCount: number;
      };
      setConditionFlow: (
        e: SetStateAction<{
          index: number;
          webhookCount: number;
          contractCount: number;
        }>
      ) => void;
      conditionLogicFlow: {
        index: number;
        everyCount: number;
        thresholdCount: number;
        targetCount: number;
      };
      setConditionLogicFlow: (
        e: SetStateAction<{
          index: number;
          everyCount: number;
          thresholdCount: number;
          targetCount: number;
        }>
      ) => void;
      executionConstraintFlow: {
        index: number;
        executionCount: number;
      };
      setExecutionConstraintFlow: (
        e: SetStateAction<{
          index: number;
          executionCount: number;
        }>
      ) => void;
      currentIndex: number;
      setCurrentIndex: (e: SetStateAction<number>) => void;
      ipfsFlow: {
        index: number;
        ipfsCount: number;
      };
      setIpfsFlow: (
        e: SetStateAction<{
          index: number;
          ipfsCount: number;
        }>
      ) => void;
      ipfsHash: {
        ipfs: string;
        litCode: string;
      };
      setIpfsHash: (
        e: SetStateAction<{
          ipfs: string;
          litCode: string;
        }>
      ) => void;

      mintPKPFlow: {
        index: number;
        mintPKPCount: number;
      };
      setMintPKPFlow: (
        e: SetStateAction<{
          index: number;
          mintPKPCount: number;
        }>
      ) => void;
      newContractActionInfo: ContractAction | undefined;
      setNewContractActionInfo: (
        e: SetStateAction<ContractAction | undefined>
      ) => void;
      newContractConditionInfo: ContractCondition | undefined;
      setNewContractConditionInfo: (
        e: SetStateAction<ContractCondition | undefined>
      ) => void;
      newFetchActionInfo: FetchAction | undefined;
      setNewFetchActionInfo: (
        e: SetStateAction<FetchAction | undefined>
      ) => void;
      newWebhookConditionInfo: WebhookCondition | undefined;
      setNewWebhookConditionInfo: (
        e: SetStateAction<WebhookCondition | undefined>
      ) => void;
      runCircuit: {
        index: number;
        circuitCount: number;
      };
      setRunCircuit: (
        e: SetStateAction<{
          index: number;
          circuitCount: number;
        }>
      ) => void;
      circuitSideBar: string;
      setCircuitSideBar: (e: SetStateAction<string>) => void;
      selectedUserCircuit: SelectedCircuit | undefined;
      setSelectedUserCircuit: (
        e: SetStateAction<SelectedCircuit | undefined>
      ) => void;
      selectedOrderSidebar: Order | undefined;
      setSelectedOrderSidebar: (e: SetStateAction<Order | undefined>) => void;
      signedPKP: {
        tokenId: string;
        publicKey: string;
        address: string;
      };
      setSignedPKP: (
        e: SetStateAction<{
          tokenId: string;
          publicKey: string;
          address: string;
        }>
      ) => void;
    }
  | undefined
>(undefined);

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [lensConectado, setLensConectado] = useState<
    LensConectado | undefined
  >();
  const [signedPKP, setSignedPKP] = useState<{
    tokenId: string;
    publicKey: string;
    address: string;
  }>({
    tokenId: "",
    publicKey: "",
    address: "",
  });
  const [selectedOrderSidebar, setSelectedOrderSidebar] = useState<
    Order | undefined
  >();
  const [selectedUserCircuit, setSelectedUserCircuit] = useState<
    SelectedCircuit | undefined
  >();
  const [currentIndexItem, setCurrentIndexItem] = useState<number[]>([]);
  const [runCircuit, setRunCircuit] = useState<{
    index: number;
    circuitCount: number;
  }>({
    index: 0,
    circuitCount: 1,
  });
  const [switchAccount, setSwitchAccount] = useState<boolean>(false);
  const [newContractActionInfo, setNewContractActionInfo] = useState<
    ContractAction | undefined
  >();
  const [newContractConditionInfo, setNewContractConditionInfo] = useState<
    ContractCondition | undefined
  >();
  const [newFetchActionInfo, setNewFetchActionInfo] = useState<
    FetchAction | undefined
  >();
  const [newWebhookConditionInfo, setNewWebhookConditionInfo] = useState<
    WebhookCondition | undefined
  >();
  const [actionFlow, setActionFlow] = useState<{
    index: number;
    fetchCount: number;
    contractCount: number;
  }>({ index: 0, fetchCount: 7, contractCount: 8 });
  const [executionConstraintFlow, setExecutionConstraintFlow] = useState<{
    index: number;
    executionCount: number;
  }>({
    index: 0,
    executionCount: 4,
  });
  const [ipfsHash, setIpfsHash] = useState<{
    ipfs: string;
    litCode: string;
  }>({
    ipfs: "",
    litCode: "",
  });
  const [allShop, setAllShop] = useState<AllShop[]>([]);
  const [conditionFlow, setConditionFlow] = useState<{
    index: number;
    webhookCount: number;
    contractCount: number;
  }>({ index: 0, webhookCount: 7, contractCount: 7 });
  const [conditionLogicFlow, setConditionLogicFlow] = useState<{
    index: number;
    everyCount: number;
    thresholdCount: number;
    targetCount: number;
  }>({
    index: 0,
    everyCount: 2,
    thresholdCount: 3,
    targetCount: 3,
  });
  const [allUserCircuits, setAllUserCircuits] = useState<AllCircuits[]>([]);
  const [generalModal, setGeneralModal] = useState<{
    open: boolean;
    message: string;
    image: string;
  }>({
    open: false,
    message: "",
    image: "",
  });
  const [mintPKPFlow, setMintPKPFlow] = useState<{
    index: number;
    mintPKPCount: number;
  }>({
    index: 0,
    mintPKPCount: 1,
  });
  const [circuitRunning, setCircuitRunning] = useState<boolean>(false);
  const [circuitInformation, setCircuitInformation] =
    useState<CircuitInformation>({
      id: undefined,
      conditions: [],
      conditionalLogic: {
        type: "EVERY",
        interval: 180000000,
      },
      actions: [],
      executionConstraints: {},
      IPFSHash: "",
    });
  const [purchaseModal, setPurchaseModal] = useState<boolean>(false);
  const [circuitSideBar, setCircuitSideBar] = useState<string>("");
  const [oracleData, setOracleData] = useState<OracleData[]>([]);
  const [lensClient, setLensClient] = useState<PublicClient | undefined>();
  const [allOrders, setAllOrders] = useState<Order[]>([]);
  const [circuitFlow, setCircuitFlow] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [routerChangeLoading, setRouterChangeLoading] =
    useState<boolean>(false);
  const [ipfsFlow, setIpfsFlow] = useState<{
    index: number;
    ipfsCount: number;
  }>({
    index: 0,
    ipfsCount: 2,
  });
  const [previewCondition, setPreviewCondition] = useState<{
    open: boolean;
    message: string;
  }>({
    open: false,
    message: "",
  });
  const [allEntries, setAllEntries] = useState<AllEntries[]>([]);

  useEffect(() => {
    if (!lensClient) {
      setLensClient(
        PublicClient.create({
          environment: mainnet,
          storage: window.localStorage,
        })
      );
    }
  }, []);

  useEffect(() => {
    console.log(`

    ██████  ██   ██ ██████  ███████      █████  ██████  ███████     ████████ ██   ██ ███████     ███    ██ ███████ ██     ██     ███    ██ ███████ ████████ ███████ 
    ██   ██ ██  ██  ██   ██ ██          ██   ██ ██   ██ ██             ██    ██   ██ ██          ████   ██ ██      ██     ██     ████   ██ ██         ██    ██      
    ██████  █████   ██████  ███████     ███████ ██████  █████          ██    ███████ █████       ██ ██  ██ █████   ██  █  ██     ██ ██  ██ █████      ██    ███████ 
    ██      ██  ██  ██           ██     ██   ██ ██   ██ ██             ██    ██   ██ ██          ██  ██ ██ ██      ██ ███ ██     ██  ██ ██ ██         ██         ██ 
    ██      ██   ██ ██      ███████     ██   ██ ██   ██ ███████        ██    ██   ██ ███████     ██   ████ ███████  ███ ███      ██   ████ ██         ██    ███████  
    `);
  }, []);

  useEffect(() => {
    const handleStart = () => {
      setRouterChangeLoading(true);
    };

    const handleStop = () => {
      setRouterChangeLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider
          customTheme={{
            "--ck-font-family": '"Nerd Semi", cursive',
          }}
        >
          <ModalContext.Provider
            value={{
              lensConectado,
              setLensConectado,
              signedPKP,
              setSignedPKP,
              lensClient,
              oracleData,
              setOracleData,
              ipfsFlow,
              setIpfsFlow,
              executionConstraintFlow,
              setExecutionConstraintFlow,
              previewCondition,
              setPreviewCondition,
              purchaseModal,
              setPurchaseModal,
              switchAccount,
              setSwitchAccount,
              generalModal,
              setGeneralModal,
              circuitInformation,
              setCircuitInformation,
              currentIndexItem,
              setCurrentIndexItem,
              actionFlow,
              setActionFlow,
              allEntries,
              setAllEntries,
              allOrders,
              setAllOrders,
              allShop,
              setAllShop,
              allUserCircuits,
              setAllUserCircuits,
              circuitFlow,
              setCircuitFlow,
              circuitRunning,
              setCircuitRunning,
              conditionFlow,
              setConditionFlow,
              conditionLogicFlow,
              setConditionLogicFlow,
              currentIndex,
              setCurrentIndex,
              ipfsHash,
              setIpfsHash,
              mintPKPFlow,
              setMintPKPFlow,
              runCircuit,
              setRunCircuit,
              newContractActionInfo,
              setNewContractActionInfo,
              newContractConditionInfo,
              setNewContractConditionInfo,
              newFetchActionInfo,
              setNewFetchActionInfo,
              newWebhookConditionInfo,
              setNewWebhookConditionInfo,
              circuitSideBar,
              setCircuitSideBar,
              selectedOrderSidebar,
              setSelectedOrderSidebar,
              selectedUserCircuit,
              setSelectedUserCircuit,
            }}
          >
            <div className="relative overflow-x-hidden w-full h-full flex flex-col selection:bg-ligeroAzul selection:text-oscuraAzul bg-offBlack min-h-screen">
              <Header />
              {routerChangeLoading ? (
                <RouterChange />
              ) : (
                <Component {...pageProps} />
              )}
              <Footer />
              <Modals />
            </div>
          </ModalContext.Provider>
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
