import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/Layout/modules/Header";
import Footer from "../components/Layout/modules/Footer";
import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { store } from "./../../redux/store";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { Provider } from "react-redux";
import { Chain, configureChains, createConfig, WagmiConfig } from "wagmi";
import { polygon } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { MutableRefObject, useEffect, useState } from "react";
import { createContext } from "react";
import Modals from "@/components/Modals/Modals";
import { useRouter } from "next/router";
import RouterChange from "@/components/Layout/modules/RouterChange";

export const chronicle: Chain = {
  id: 175177,
  name: "Chronicle - Lit Protocol Testnet",
  network: "chronicle",
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

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [chronicle, polygon],
  [
    jsonRpcProvider({
      rpc: () => ({
        http: "https://chain-rpc.litprotocol.com/http",
      }),
    }),
    alchemyProvider({
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY as string,
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "CoinOp",
  chains,
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string,
});

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
  connectors,
});

export const ScrollContext = createContext<
  MutableRefObject<HTMLDivElement | null>
>(null!);

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [routerChangeLoading, setRouterChangeLoading] =
    useState<boolean>(false);
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
    <Provider store={store}>
      <WagmiConfig config={config}>
        <RainbowKitProvider chains={chains}>
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
        </RainbowKitProvider>
      </WagmiConfig>
    </Provider>
  );
}
