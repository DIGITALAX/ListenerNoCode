import Head from "next/head";
import Image from "next/legacy/image";
import { INFURA_GATEWAY } from "../../lib/constants";
import useShop from "@/components/Shop/hooks/useShop";
import AllShop from "@/components/Shop/modules/AllShop";
import Checkout from "@/components/Shop/modules/Checkout";
import { useEffect, useState } from "react";

export default function Shop() {
  const {
    shopLoading,
    purchaseLoading,
    address,
    approved,
    setFulfillmentDetails,
    fulfillmentDetails,
    checkoutCurrency,
    setCheckoutCurrency,
    setCurrentIndex,
    currentIndex,
    checkOutOpen,
    setCheckoutOpen,
    collectItem,
    approveSpend,
    cartItems,
    setCartItems,
  } = useShop();

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
            cartItems={cartItems}
            checkOutOpen={checkOutOpen}
            setCartItems={setCartItems}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            largeScreen={largeScreen}
          />
        )}
      </div>
      <Checkout
        cartItems={cartItems}
        setCartItems={setCartItems}
        largeScreen={largeScreen}
        purchaseLoading={purchaseLoading}
        purchaseItems={collectItem}
        fulfillmentDetails={fulfillmentDetails}
        setCheckoutCurrency={setCheckoutCurrency}
        setFulfillmentDetails={setFulfillmentDetails}
        address={address ? true : false}
        approved={approved}
        checkoutCurrency={checkoutCurrency}
        handleApproveSpend={approveSpend}
        checkOutOpen={checkOutOpen}
        setCheckoutOpen={setCheckoutOpen}
      />
    </div>
  );
}
