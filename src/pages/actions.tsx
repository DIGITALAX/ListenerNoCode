import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Head from "next/head";
import { INFURA_GATEWAY } from "../../lib/constants";
import Image from "next/legacy/image";
import Link from "next/link";
import useActions from "@/components/Actions/hooks/useActions";
import AllActions from "@/components/Actions/modules/AllActions";
import { useEffect, useState } from "react";

export default function Actions() {
  const allEntries = useSelector(
    (state: RootState) => state.app.allEntriesReducer.value
  );
  const { entriesLoading } = useActions();

  const [largeScreen, setLargeScreen] = useState<boolean>(true);

  useEffect(() => {
    const handleResize = () => {
      setLargeScreen(Boolean(window.innerWidth > 600));
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="relative w-full flex flex-row border-t-2 border-sol grow"
      id={largeScreen ? "heightCheckout" : ""}
      style={largeScreen ? {} : { height: "45rem" }}
    >
      <Head>
        <title>No-Code Lit Listener | Actions</title>
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
      <div className="relative w-full min-h-100 flex items-center justify-center grow">
        {allEntries?.length < 1 && !entriesLoading ? (
          <div className="relative w-full h-full flex items-center justify-center">
            <Link
              className="relative w-fit h-fit text-center font-vcr text-white flex items-center justify-center cursor-pointer"
              href={`/`}
            >
              No Entries Yet. Start A Circuit & Publish Your Lit Action?
            </Link>
          </div>
        ) : entriesLoading ? (
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
          <div className="relative flex flex-row w-full h-full justify-center items-center">
            <AllActions allEntries={allEntries} />
          </div>
        )}
      </div>
    </div>
  );
}
