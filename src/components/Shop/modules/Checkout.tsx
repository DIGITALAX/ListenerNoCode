import { FunctionComponent } from "react";
import { AllShop, CheckoutProps } from "../types/shop.types";
import Image from "next/legacy/image";
import { ACCEPTED_TOKENS, INFURA_GATEWAY } from "../../../../lib/constants";
import { AiOutlineLoading } from "react-icons/ai";
import ShippingInfo from "./ShippingInfo";

const Checkout: FunctionComponent<CheckoutProps> = ({
  cartItems,
  purchaseLoading,
  purchaseItems,
  dispatch,
  setCheckoutCurrency,
  checkoutCurrency,
  fulfillmentDetails,
  setFulfillmentDetails,
  approved,
  handleApproveSpend,
  oracleValue,
  openConnectModal,
  address,
}): JSX.Element => {
  return (
    <div
      className="relative w-96 border-l-2 border-sol bg-aBlack px-4 py-6"
      id="heightAllCircuits"
    >
      <div className="flex flex-row items-center justify-center relative w-full h-full">
        <div className="relative w-1 h-full bg-moda"></div>
        <div className="relative w-full h-full flex flex-col gap-5">
          <div className="relative w-full h-fit flex flex-row items-start justify-center">
            <div className="relative h-1 w-10 bg-moda flex items-start justify-center"></div>
            <div
              className="relative h-3 w-4 flex items-center justify-center -top-0.5"
              id="boxGrad"
            ></div>
            <div
              className="uppercase text-xl font-vcr text-moda px-1 flex items-start whitespace-nowrap justify-center w-fit h-fit -top-2"
              id="blur"
            >
              Cart Items
            </div>
            <div
              className="relative h-3 w-4 flex items-center justify-center -top-0.5"
              id="boxGrad"
            ></div>
            <div className="relative h-1 w-full bg-moda flex items-center justify-center"></div>
          </div>
          <div className="relative w-full h-full flex flex-col gap-3 font-vcr px-2 items-center overflow-y-scroll">
            <div className="flex flex-col justify-start h-fit items-center gap-3">
              {cartItems?.map((value: AllShop, index: number) => {
                return (
                  <div
                    key={index}
                    className={`relative w-full h-fit flex flex-row justify-center items-center gap-3 cursor-pointer active:scale-95 hover:text-sol active:text-sol grow text-center 
                     `}
                  >
                    <div className="relative flex flex-col relative w-full h-fit justify-start items-center">
                      <div
                        className="flex relative w-full h-fit uppercase items-center justify-center text-sm flex-row gap-1"
                        id="blur"
                      >
                        <div className="relative w-fit h-fit flex items-center justify-start"></div>
                        <div
                          className={`relative w-fit h-fit flex items-center justify-start `}
                        ></div>
                      </div>
                      <div
                        className="flex relative w-full h-fit uppercase items-center justify-center text-xs"
                        id="blur"
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
            <ShippingInfo
              fulfillmentDetails={fulfillmentDetails}
              setFulfillmentDetails={setFulfillmentDetails}
            />
            <div className="relative w-3/4 justify-start items-center flex flex-row gap-1">
              {ACCEPTED_TOKENS?.map((item: string[], index: number) => {
                return (
                  <div
                    className={`relative w-fit h-fit rounded-full flex items-center cursor-pointer active:scale-95 ${
                      checkoutCurrency === item[1]
                        ? "opacity-50"
                        : "opacity-100"
                    }`}
                    key={index}
                    onClick={() => setCheckoutCurrency(item[1])}
                  >
                    <Image
                      src={`${INFURA_GATEWAY}/ipfs/${item[0]}`}
                      className="flex"
                      draggable={false}
                      width={30}
                      height={35}
                    />
                  </div>
                );
              })}
            </div>
            <div
              className="relative w-3/4 h-12 rounded-md border border-white bg-azul text-white font-mana items-center justify-center flex cursor-pointer active:scale-95"
              onClick={
                !address && !purchaseLoading
                  ? openConnectModal
                  : approved
                  ? () => !purchaseLoading && purchaseItems()
                  : () => !purchaseLoading && handleApproveSpend()
              }
            >
              <div
                className={`relative w-fit h-fit flex justify-center items-center ${
                  purchaseLoading && "animate-spin"
                }`}
              >
                {purchaseLoading ? (
                  <AiOutlineLoading size={15} color={"white"} />
                ) : !address ? (
                  "CONNECT"
                ) : !approved ? (
                  "APPROVE SPEND"
                ) : (
                  "CHECKOUT"
                )}
              </div>
            </div>
          </div>
          <div className="relative h-1 w-full bg-moda flex items-start justify-center"></div>
        </div>
        <div className="relative w-1 h-full bg-moda"></div>
      </div>
    </div>
  );
};

export default Checkout;
