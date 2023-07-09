import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/Layout/modules/Header";
import Footer from "../components/Layout/modules/Footer";
import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { store } from "./../../redux/store";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { Provider } from "react-redux";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { polygon } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { MutableRefObject, useEffect } from "react";
import { createContext } from "react";
import Modals from "@/components/Modals/Modals";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [polygon],
  [
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
  useEffect(() => {
    console.log(`

    ██████  ██   ██ ██████  ███████      █████  ██████  ███████     ████████ ██   ██ ███████     ███    ██ ███████ ██     ██     ███    ██ ███████ ████████ ███████ 
    ██   ██ ██  ██  ██   ██ ██          ██   ██ ██   ██ ██             ██    ██   ██ ██          ████   ██ ██      ██     ██     ████   ██ ██         ██    ██      
    ██████  █████   ██████  ███████     ███████ ██████  █████          ██    ███████ █████       ██ ██  ██ █████   ██  █  ██     ██ ██  ██ █████      ██    ███████ 
    ██      ██  ██  ██           ██     ██   ██ ██   ██ ██             ██    ██   ██ ██          ██  ██ ██ ██      ██ ███ ██     ██  ██ ██ ██         ██         ██ 
    ██      ██   ██ ██      ███████     ██   ██ ██   ██ ███████        ██    ██   ██ ███████     ██   ████ ███████  ███ ███      ██   ████ ██         ██    ███████  
    `);
  }, []);

  return (
    <Provider store={store}>
      <WagmiConfig config={config}>
        <RainbowKitProvider chains={chains}>
          <div className="relative overflow-x-hidden w-full h-screen flex flex-col selection:bg-ligeroAzul selection:text-oscuraAzul bg-offBlack">
            <Header />
            <Component {...pageProps} />
            <Footer />
            <Modals />
          </div>
        </RainbowKitProvider>
      </WagmiConfig>
    </Provider>
  );
}
