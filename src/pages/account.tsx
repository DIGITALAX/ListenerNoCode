import Image from "next/legacy/image";
import { INFURA_GATEWAY } from "../../lib/constants";
import Head from "next/head";
import AllCircuits from "@/components/Account/modules/AllCircuits";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import useAccountPage from "@/components/Account/hooks/useAccount";
import SelectedCircuit from "@/components/Account/modules/SelectedCircuit";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Account() {
  const dispatch = useDispatch();
  const [globalLoader, setGlobalLoader] = useState<boolean>(true);
  const [largeScreen, setLargeScreen] = useState<boolean>(true);
  const allCircuits = useSelector(
    (state: RootState) => state.app.allUserCircuitsReducer.value
  );
  const selectedCircuitSideBar = useSelector(
    (state: RootState) => state.app.selectedCircuitSideBarReudcer.value
  );
  const selectedCircuit = useSelector(
    (state: RootState) => state.app.selectedCircuitReducer.value
  );
  const {
    allCircuitsLoading,
    circuitLogsLoading,
    addressExists,
    interruptLoading,
    handleInterruptCircuit,
    circuitsOpen,
    setCircuitsOpen,
  } = useAccountPage();

  useEffect(() => {
    if (!allCircuitsLoading && !circuitLogsLoading) {
      setGlobalLoader(false);
    }
  }, [allCircuitsLoading, circuitLogsLoading]);

  useEffect(() => {
    if (window) {
      setLargeScreen(Boolean(window.innerWidth > 500));
    }
  }, []);

  return (
    <div
      className="relative w-full flex flex-row border-t-2 border-sol grow"
      id="heightCheckout"
    >
      <Head>
        <title>No-Code Lit Listener | Account</title>
        <link rel="icon" href="/favicon.ico" />
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
      <div className="relative w-full min-h-100 flex items-center justify-center grow xl:order-first order-last">
        {!addressExists &&
        !globalLoader &&
        !allCircuitsLoading &&
        !circuitLogsLoading ? (
          <div className="relative w-full h-ful flex items-center justify-center">
            <div className="relative w-fit h-fit text-center font-vcr text-white flex items-center justify-center">
              Connect Account to View Your Active Circuits.
            </div>
          </div>
        ) : addressExists && !globalLoader && allCircuits?.length < 1 ? (
          <div className="relative w-full h-ful flex items-center justify-center">
            <Link
              className="relative w-fit h-fit text-center font-vcr text-white flex items-center justify-center cursor-pointer"
              href={`/`}
            >
              No Circuits Yet. Start one?
            </Link>
          </div>
        ) : allCircuitsLoading || circuitLogsLoading || globalLoader ? (
          <div className="relative w-full h-ful flex items-center justify-center">
            <div className="relative w-6 h-6 animate-spin flex items-center justify-center">
              <Image
                draggable={false}
                layout="fill"
                src={`${INFURA_GATEWAY}/ipfs/QmUxiEqnDfFGSPTCrjt4rpnch84v2pEopzhXUEMJFVNuo6`}
              />
            </div>
          </div>
        ) : (
          <div className="relative flex flex-row w-full h-full justify-center items-center">
            <SelectedCircuit
              selectedCircuit={selectedCircuit}
              handleInterruptCircuit={handleInterruptCircuit}
              interruptLoading={interruptLoading}
            />
          </div>
        )}
      </div>
      <AllCircuits
        largeScreen={largeScreen}
        allUserCircuits={allCircuits}
        selectedCircuitSideBar={selectedCircuitSideBar}
        dispatch={dispatch}
        circuitsOpen={circuitsOpen}
        setCircuitsOpen={setCircuitsOpen}
      />
    </div>
  );
}
