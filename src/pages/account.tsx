import Image from "next/legacy/image";
import { INFURA_GATEWAY } from "../../lib/constants";
import Head from "next/head";
import AllCircuits from "@/components/Account/modules/AllCircuits";
import useAccountPage from "@/components/Account/hooks/useAccount";
import SelectedCircuit from "@/components/Account/modules/SelectedCircuit";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import useOrder from "@/components/Account/hooks/useOrder";
import { IoShirtOutline } from "react-icons/io5";
import { TbSwitchHorizontal, TbCircuitSwitchOpen } from "react-icons/tb";
import { ModalContext } from "./_app";

export default function Account() {
  const context = useContext(ModalContext);
  const [globalLoader, setGlobalLoader] = useState<boolean>(true);
  const [largeScreen, setLargeScreen] = useState<boolean>(true);

  const {
    allCircuitsLoading,
    circuitLogsLoading,
    addressExists,
    interruptLoading,
    handleInterruptCircuit,
    circuitsOpen,
    setCircuitsOpen,
  } = useAccountPage();
  const { ordersLoading, decryptFulfillment, decryptLoading } = useOrder();

  useEffect(() => {
    if (!allCircuitsLoading && !circuitLogsLoading && !ordersLoading) {
      setGlobalLoader(false);
    }
  }, [allCircuitsLoading, circuitLogsLoading, ordersLoading]);

  useEffect(() => {
    const handleResize = () => {
      setLargeScreen(Boolean(window.innerWidth > 820));
      if (Boolean(window.innerWidth < 820)) {
        setCircuitsOpen(false);
      }
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="relative w-full h-fit flex flex-row border-t-2 border-sol grow overflow-y-scroll"
      // id={largeScreen ? "heightCheckout" : ""}
      // style={largeScreen ? {} : {height: "45rem"}}
    >
      <Head>
        <title>No-Code Lit Listener | Account</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="og:image"
          content="https://listener.irrevocable.dev/card.png/"
        />
      </Head>
      <div className="absolute w-full h-full flex mix-blend-overlay">
        <Image
          src={`${INFURA_GATEWAY}/ipfs/QmZ3DdVrAmYaJTgXHu56eUGGLzLeQkhLeTc433wpxppu4S`}
          layout="fill"
          objectFit="cover"
          className="w-full h-full"
          draggable={false}
        />
      </div>
      <div className="absolute w-full h-full flex mix-blend-hard-light">
        <Image
          src={`${INFURA_GATEWAY}/ipfs/QmXiPMfdaEVsmArAdBjXyfytNZQt56R98iZxS94yRGxEXm`}
          layout="fill"
          objectFit="cover"
          className="w-full h-full"
          draggable={false}
        />
      </div>
      <div className="relative w-full min-h-100 flex flex-col items-center justify-center z-1 grow xl:order-first order-last">
        {!globalLoader &&
          !allCircuitsLoading &&
          !circuitLogsLoading &&
          !ordersLoading && (
            <div className="relative w-5/6 h-fit flex">
              <div
                className="relative top-4 left-0 flex flex-row w-fit px-3 py-1.5 h-fit border border-white bg-black/40 gap-3 cursor-pointer active:scale-95 z-1 items-center justify-center"
                onClick={() =>
                  context?.setSwitchAccount(!context?.switchAccount)
                }
              >
                <div className="relative w-fit h-fit flex items-center justify-center">
                  <IoShirtOutline
                    color={context?.switchAccount ? "#F6D39B" : "white"}
                    size={15}
                  />
                </div>
                <div className="relative w-fit h-fit flex items-center justify-center">
                  <TbSwitchHorizontal color="white" size={15} />
                </div>
                <div className="relative w-fit h-fit flex items-center justify-center">
                  <TbCircuitSwitchOpen
                    color={!context?.switchAccount ? "#F6D39B" : "white"}
                    size={18}
                  />
                </div>
              </div>
            </div>
          )}
        {!addressExists &&
        !globalLoader &&
        !allCircuitsLoading &&
        !circuitLogsLoading &&
        !ordersLoading ? (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="relative w-fit h-fit text-center font-vcr text-white flex items-center justify-center">
              {!context?.switchAccount
                ? "Connect Account to View Your Active Circuits."
                : "Connect Account to View Your Active Orders."}
            </div>
          </div>
        ) : addressExists &&
          !globalLoader &&
          ((!context?.switchAccount &&
            Number(context?.allUserCircuits?.length) < 1) ||
            (context?.switchAccount && context?.allOrders?.length < 1)) ? (
          <div className="relative w-full h-full flex items-center justify-center">
            <Link
              className="relative w-fit h-fit text-center font-vcr text-white flex items-center justify-center cursor-pointer"
              href={!context?.switchAccount ? `/` : "/shop"}
            >
              {!context?.switchAccount
                ? "No Circuits Yet. Start one?"
                : "No Orders Yet. Go to Shop?"}
            </Link>
          </div>
        ) : allCircuitsLoading ||
          circuitLogsLoading ||
          globalLoader ||
          ordersLoading ? (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="relative w-6 h-6 animate-spin flex items-center justify-center">
              <Image
                draggable={false}
                layout="fill"
                src={`${INFURA_GATEWAY}/ipfs/QmUxiEqnDfFGSPTCrjt4rpnch84v2pEopzhXUEMJFVNuo6`}
              />
            </div>
          </div>
        ) : (
          <div className="relative flex flex-col w-full h-full justify-center items-center gap-3">
            <SelectedCircuit
              handleInterruptCircuit={handleInterruptCircuit}
              interruptLoading={interruptLoading}
              decryptFulfillment={decryptFulfillment}
              decryptLoading={decryptLoading}
            />
          </div>
        )}
      </div>
      <AllCircuits
        largeScreen={largeScreen}
        circuitsOpen={circuitsOpen}
        setCircuitsOpen={setCircuitsOpen}
      />
    </div>
  );
}
