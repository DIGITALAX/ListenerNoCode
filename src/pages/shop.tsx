import Head from "next/head";
import Image from "next/legacy/image";
import { INFURA_GATEWAY } from "../../lib/constants";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import useShop from "@/components/Shop/hooks/useShop";
import AllShop from "@/components/Shop/modules/AllShop";
import Checkout from "@/components/Shop/modules/Checkout";
import { useChainModal, useConnectModal } from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";
import useSignIn from "@/components/Shop/hooks/useSignIn";

export default function Shop() {
  const dispatch = useDispatch();
  const { openConnectModal } = useConnectModal();
  const { openChainModal } = useChainModal();
  const {
    shopLoading,
    purchaseLoading,
    address,
    approved,
    setFulfillmentDetails,
    fulfillmentDetails,
    checkoutCurrency,
    setCheckoutCurrency,
    switchNeeded,
    setCurrentIndex,
    currentIndex,
    checkOutOpen,
    setCheckoutOpen,
    setChosenItem,
    chosenItem,
    collectItem,
    approveSpend,
  } = useShop();
  const allShopItems = useSelector(
    (state: RootState) => state.app.allShopReducer.value
  );
  const lensConnected = useSelector(
    (state: RootState) => state.app.lensConnectedReducer.profile
  );
  const currentIndexItem = useSelector(
    (state: RootState) => state.app.currentIndexItemReducer.value
  );
  const oracleData = useSelector(
    (state: RootState) => state.app.oracleDataReducer.data
  );
  const { handleLensConnect, signInLoading } = useSignIn();
  const [largeScreen, setLargeScreen] = useState<boolean>(true);

  useEffect(() => {
    const handleResize = () => {
      setLargeScreen(Boolean(window.innerWidth > 600));
      if (Boolean(window.innerWidth < 600)) {
        setCheckoutOpen(false);
      }
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div
      className="relative w-full flex flex-row border-t-2 border-sol grow overflow-hidden h-fit"
      // id={largeScreen ? "heightCheckout" : ""}
      // style={largeScreen ? {} : { height: "45rem" }}
    >
      <Head>
        <title>No-Code Lit Listener | Shop</title>
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
      <div className="relative w-full min-h-100 flex items-center justify-center grow">
        {shopLoading ? (
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
          <AllShop
            checkOutOpen={checkOutOpen}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            allShopItems={allShopItems}
            dispatch={dispatch}
            currentIndexItem={currentIndexItem}
            largeScreen={largeScreen}
            chosenItem={chosenItem}
            setChosenItem={setChosenItem}
          />
        )}
      </div>
      <Checkout
        dispatch={dispatch}
        chosenCartItem={chosenItem}
        setChosenCartItem={setChosenItem}
        largeScreen={largeScreen}
        purchaseLoading={purchaseLoading}
        purchaseItems={collectItem}
        fulfillmentDetails={fulfillmentDetails}
        setCheckoutCurrency={setCheckoutCurrency}
        setFulfillmentDetails={setFulfillmentDetails}
        address={address ? true : false}
        approved={approved}
        openConnectModal={openConnectModal}
        checkoutCurrency={checkoutCurrency}
        handleApproveSpend={approveSpend}
        switchNeeded={switchNeeded}
        openChainModal={openChainModal}
        checkOutOpen={checkOutOpen}
        setCheckoutOpen={setCheckoutOpen}
        lensConnected={lensConnected}
        lensSignIn={handleLensConnect}
        lensLoading={signInLoading}
        oracleData={oracleData}
      />
    </div>
  );
}
