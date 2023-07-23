import { FunctionComponent } from "react";
import { CartItem, CheckoutProps } from "../types/shop.types";
import Image from "next/legacy/image";
import { ACCEPTED_TOKENS, INFURA_GATEWAY } from "../../../../lib/constants";
import { AiOutlineLoading } from "react-icons/ai";
import ShippingInfo from "./ShippingInfo";
import { ImCross } from "react-icons/im";
import { setCartItems } from "../../../../redux/reducers/cartItemsSlice";
import lodash from "lodash";
import { setModalOpen } from "../../../../redux/reducers/modalOpenSlice";
import {
  PiArrowCircleUpLeftFill,
  PiArrowCircleDownRightFill,
} from "react-icons/pi";

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
  openChainModal,
  switchNeeded,
  setCheckoutOpen,
  checkOutOpen,
}): JSX.Element => {
  return (
    <div
      className={`absolute z-20 right-0 top-0 border-l-2 border-sol bg-aBlack px-4 py-6 ${
        checkOutOpen ? "w-80" : "w-10"
      }`}
      id="heightCheckout"
    >
      <div
        className="absolute top-10 -left-4 flex opacity-80 cursor-pointer w-fit h-fit z-10 border border-ballena rounded-full bg-white"
        onClick={() => setCheckoutOpen(!checkOutOpen)}
      >
        {checkOutOpen ? (
          <PiArrowCircleDownRightFill size={30} color="#FFD85F" />
        ) : (
          <PiArrowCircleUpLeftFill size={30} color="#FFD85F" />
        )}
      </div>
      <div
        className={`flex-row items-center justify-center relative w-full h-full ${
          checkOutOpen ? "flex" : "hidden"
        }`}
      >
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
          <div className="relative w-full h-full flex overflow-y-scroll">
            <div className="relative w-full h-fit flex flex-col gap-10 font-vcr items-center justify-center px-2">
              <div className="flex flex-col justify-start h-fit items-center gap-3 w-full">
                {cartItems?.length < 1 ? (
                  <div className="relative w-full h-full flex text-center items-center justify-center font-vcr text-ballena text-sm">
                    Add Items to Your Cart.
                  </div>
                ) : (
                  cartItems?.map((item: CartItem, index: number) => {
                    return (
                      <div
                        key={index}
                        className={`relative w-full h-12 flex flex-row gap-5 font-mana text-white text-xs justify-between items-center px-1.5 bg-ama/20 rounded-md`}
                      >
                        <div className="relative w-10 h-8 rounded-lg bg-cross flex items-center justify-center">
                          <Image
                            src={`${INFURA_GATEWAY}/ipfs/${
                              item.uri.images?.[0]?.split("ipfs://")[1]
                            }`}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-lg"
                            draggable={false}
                          />
                        </div>
                        <div className="relative w-fit h-fit text-ama flex">
                          {
                            ACCEPTED_TOKENS.find(
                              (subArray) => subArray[1] === checkoutCurrency
                            )?.[1]
                          }{" "}
                          {item.price / 10 ** 18}
                        </div>
                        <div className="relative w-fit h-fit text-ama flex">
                          {item.amount}
                        </div>
                        <div className="relative w-fit h-full flex flex-row items-center justify-center gap-1.5">
                          <div
                            className="relative w-5 h-5 cursor-pointer active:scale-95 flex items-center justify-center rotate-90"
                            onClick={() => {
                              if (
                                cartItems?.reduce(
                                  (total, item) => total + Number(item.amount),
                                  0
                                ) >= 5
                              ) {
                                dispatch(
                                  setModalOpen({
                                    actionOpen: true,
                                    actionMessage:
                                      "Only 5 items in the cart at a time.",
                                    actionImage:
                                      "QmUzzkGb1HKfixUnyKbVDHVb9TG9nYpdYQhL6uZckRETow",
                                  })
                                );
                                return;
                              }

                              dispatch(
                                setCartItems([
                                  ...cartItems.slice(0, index),
                                  {
                                    ...cartItems[index],
                                    amount: cartItems[index].amount + 1,
                                  },
                                  ...cartItems.slice(index + 1),
                                ])
                              );
                            }}
                          >
                            <Image
                              src={`${INFURA_GATEWAY}/ipfs/Qma3jm41B4zYQBxag5sJSmfZ45GNykVb8TX9cE3syLafz2`}
                              layout="fill"
                              draggable={false}
                            />
                          </div>
                          <div
                            className="relative w-5 h-5 cursor-pointer active:scale-95 flex items-center justify-center rotate-90"
                            onClick={() =>
                              dispatch(
                                setCartItems(
                                  cartItems[index].amount > 1
                                    ? [
                                        ...cartItems.slice(0, index),
                                        {
                                          ...cartItems[index],
                                          amount: cartItems[index].amount - 1,
                                        },
                                        ...cartItems.slice(index + 1),
                                      ]
                                    : [
                                        ...cartItems.slice(0, index),
                                        ...cartItems.slice(index + 1),
                                      ]
                                )
                              )
                            }
                          >
                            <Image
                              src={`${INFURA_GATEWAY}/ipfs/QmcBVNVZWGBDcAxF4i564uSNGZrUvzhu5DKkXESvhY45m6`}
                              layout="fill"
                              draggable={false}
                            />
                          </div>
                        </div>
                        <div
                          className="ml-auto justify-end items-center w-fit h-fit flex cursor-pointer active:scale-95"
                          onClick={() => {
                            const newCart = lodash.concat(
                              lodash.slice([...cartItems], 0, index),
                              lodash.slice([...cartItems], index + 1)
                            );
                            dispatch(setCartItems(newCart));
                          }}
                        >
                          <ImCross color="white" size={10} />
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
              <ShippingInfo
                fulfillmentDetails={fulfillmentDetails}
                setFulfillmentDetails={setFulfillmentDetails}
              />
              <div className="relative justify-center items-center w-3/4  h-fit flex flex-row font-vcr text-sm text-ama text-base gap-3">
                <div className="relative w-fit h-fit">Total:</div>
                <div className="relative w-fit h-fit">
                  {`${
                    ACCEPTED_TOKENS.find(
                      (subArray) => subArray[1] === checkoutCurrency
                    )?.[1]
                  } `}
                  {cartItems?.reduce(
                    (accumulator, currentItem) =>
                      accumulator +
                      (currentItem.price * currentItem.amount) / 10 ** 18,
                    0
                  ) / oracleValue}
                </div>
              </div>
              <div className="relative flex flex-col gap-1.5 items-center justify-center">
                <div className="relative w-fit h-fit flex items-center justify-center font-vcr text-white text-xs">
                  Choose Payment Currency
                </div>
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
              </div>
              <div className="relative w-full h-fit flex flex-col gap-1.5 items-center justify-center">
                {switchNeeded && (
                  <div className="relative break-words text-xs font-vcr text-ballena flex items-center justify-center  text-center">{`( switch to polygon network )`}</div>
                )}
                <div
                  className="relative w-3/4 h-12 border border-moda bg-azul text-ballena font-vcr items-center justify-center flex cursor-pointer active:scale-95"
                  onClick={
                    !address && !purchaseLoading
                      ? openConnectModal
                      : address && switchNeeded
                      ? openChainModal
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
                    ) : address && switchNeeded ? (
                      "SWITCH NETWORK"
                    ) : !approved ? (
                      "APPROVE SPEND"
                    ) : (
                      "CHECKOUT"
                    )}
                  </div>
                </div>
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
