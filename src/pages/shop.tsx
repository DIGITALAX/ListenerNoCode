import Head from "next/head";
import Image from "next/legacy/image";
import { INFURA_GATEWAY } from "../../lib/constants";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import useShop from "@/components/Shop/hooks/useShop";
import AllShop from "@/components/Shop/modules/AllShop";
import Checkout from "@/components/Shop/modules/Checkout";
import { useConnectModal } from "@rainbow-me/rainbowkit";

export default function Shop() {
  const dispatch = useDispatch();
  const { openConnectModal } = useConnectModal();
  const {
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
    setCheckoutCurrency
  } = useShop();
  const allShopItems = useSelector(
    (state: RootState) => state.app.allShopReducer.value
  );
  const cartItems = useSelector(
    (state: RootState) => state.app.cartItemsReducer.value
  );
  return (
    <div className="relative w-full h-full flex flex-row border-t-2 border-sol grow">
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
            <AllShop allShopItems={allShopItems} />
          </div>
        )}
      </div>
      <Checkout
        purchaseLoading={purchaseLoading}
        purchaseItems={purchaseItems}
        cartItems={cartItems}
        fulfillmentDetails={fulfillmentDetails}
        setCheckoutCurrency={setCheckoutCurrency}
        setFulfillmentDetails={setFulfillmentDetails}
        address={address}
        approved={approved}
        openConnectModal={openConnectModal}
        dispatch={dispatch}
        checkoutCurrency={checkoutCurrency}
        oracleValue={oracleValue}
        handleApproveSpend={handleApproveSpend}
      />
    </div>
  );
}
