import { FunctionComponent, useContext } from "react";
import { CheckoutProps } from "../types/shop.types";
import Image from "next/legacy/image";
import { ACCEPTED_TOKENS, INFURA_GATEWAY } from "../../../../lib/constants";
import { AiOutlineLoading } from "react-icons/ai";
import ShippingInfo from "./ShippingInfo";
import { ImCross } from "react-icons/im";
import {
  PiArrowCircleUpLeftFill,
  PiArrowCircleDownRightFill,
} from "react-icons/pi";
import { ModalContext } from "@/pages/_app";
import { useAccount } from "wagmi";
import useSignIn from "../hooks/useSignIn";
import { useModal } from "connectkit";

const Checkout: FunctionComponent<CheckoutProps> = ({
  purchaseLoading,
  purchaseItems,
  setCheckoutCurrency,
  checkoutCurrency,
  fulfillmentDetails,
  setFulfillmentDetails,
  approved,
  handleApproveSpend,
  address,
  setCheckoutOpen,
  checkOutOpen,
  largeScreen,
  cartItems,
  setCartItems,
}): JSX.Element => {
  const context = useContext(ModalContext);
  const { chainId } = useAccount();
  const { handleLensConnect, lensLoading } = useSignIn();
  const { openOnboarding, openSwitchNetworks } = useModal();
  return (
    <div
      className={`absolute z-20 right-0 top-0 border-l-2 border-sol bg-aBlack px-4 py-6 h-full ${
        checkOutOpen ? (largeScreen ? "w-80" : "w-11/12") : "w-10"
      }`}
    >
      <div
        className="absolute top-10 -left-4 flex opacity-80 cursor-pointer w-fit h-fit z-5 border border-ballena rounded-full bg-white"
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
        <div className="relative w-full h-full flex items-center flex-col gap-5">
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
          <div className="relative w-full h-full flex overflow-y-scroll items-start justify-center">
            <div className="relative w-full h-fit flex flex-col gap-10 font-vcr items-center justify-center px-2">
              {cartItems?.length < 1 ? (
                <div className="relative w-fit h-fit flex items-center justify-center font-vcr text-ama break-words text-xs">
                  Add apparel to your cart.
                </div>
              ) : (
                <div className="flex flex-col justify-start h-fit items-center gap-3 w-full">
                  {cartItems?.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className={`relative w-full h-12 flex flex-row gap-5 font-mana text-white text-xs justify-between items-center px-1.5 bg-ama/20 rounded-md`}
                      >
                        <div className="relative w-10 h-8 rounded-lg bg-cross flex items-center justify-center">
                          <Image
                            src={`${INFURA_GATEWAY}/ipfs/${
                              item?.item?.metadata?.images?.[0]?.split(
                                "ipfs://"
                              )[1]
                            }`}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-lg"
                            draggable={false}
                          />
                        </div>
                        <div className="relative w-fit h-fit text-ama flex">
                          {"USD "}
                          {(Number(item?.item?.price) *
                            Number(item?.chosenAmount)) /
                            10 ** 18}
                        </div>
                        <div className="relative w-fit text-xxs h-fit text-ama flex">
                          {item?.chosenSize}
                        </div>
                        <div className="relative w-fit text-xxs h-fit text-ama flex">
                          {item?.chosenAmount}
                        </div>
                        <div className="relative w-fit h-full flex flex-row items-center justify-center gap-1.5">
                          <div
                            className={`relative w-4 h-4 flex items-center justify-center rotate-90 ${
                              Number(item?.item?.amount) ==
                              Number(item?.chosenAmount)
                                ? "opacity-70"
                                : "cursor-pointer active:scale-95"
                            }`}
                            onClick={() => {
                              if (
                                cartItems
                                  ?.filter(
                                    (element) =>
                                      element?.item?.postId ==
                                      item?.item?.postId
                                  )
                                  ?.reduce(
                                    (accumulator, currentItem) =>
                                      accumulator + currentItem.chosenAmount,
                                    0
                                  ) +
                                  1 >
                                Number(item?.item?.amount)
                              ) {
                                context?.setGeneralModal({
                                  open: true,
                                  message:
                                    "We know you're eager. You've reached this prints' collect limit.",
                                  image:
                                    "QmSUH38BqmfPci9NEvmC2KRQEJeoyxdebHiZi1FABbtueg",
                                });

                                return;
                              }

                              setCartItems((prev) => {
                                let arr = [...prev];
                                arr[
                                  arr.findIndex(
                                    (a) =>
                                      a?.item?.postId == item?.item?.postId &&
                                      a?.chosenSize == item?.chosenSize
                                  )!
                                ] = {
                                  ...arr[
                                    arr.findIndex(
                                      (a) =>
                                        a?.item?.postId == item?.item?.postId &&
                                        a?.chosenSize == item?.chosenSize
                                    )!
                                  ]!,
                                  chosenAmount:
                                    Number(
                                      arr[
                                        arr.findIndex(
                                          (a) =>
                                            a?.item?.postId ==
                                            item?.item?.postId
                                        )!
                                      ]?.chosenAmount!
                                    ) +
                                      1 >
                                    Number(
                                      arr[
                                        arr.findIndex(
                                          (a) =>
                                            a?.item?.postId ==
                                            item?.item?.postId
                                        )!
                                      ]?.item?.amount!
                                    )
                                      ? arr[
                                          arr.findIndex(
                                            (a) =>
                                              a?.item?.postId ==
                                              item?.item?.postId
                                          )!
                                        ]?.chosenAmount!
                                      : arr[
                                          arr.findIndex(
                                            (a) =>
                                              a?.item?.postId ==
                                              item?.item?.postId
                                          )!
                                        ]?.chosenAmount! + 1,
                                };

                                return arr;
                              });
                            }}
                          >
                            <Image
                              src={`${INFURA_GATEWAY}/ipfs/Qma3jm41B4zYQBxag5sJSmfZ45GNykVb8TX9cE3syLafz2`}
                              layout="fill"
                              draggable={false}
                            />
                          </div>
                          <div
                            className="relative w-4 h-4 cursor-pointer active:scale-95 flex items-center justify-center rotate-90"
                            onClick={() =>
                              setCartItems((prev) => {
                                let arr = [...prev];
                                let actual =
                                  arr[
                                    arr.findIndex(
                                      (a) =>
                                        a?.item?.postId == item?.item?.postId &&
                                        a?.chosenSize == item?.chosenSize
                                    )!
                                  ];

                                if (actual?.chosenAmount - 1 == 0) {
                                  arr = arr?.filter(
                                    (a) =>
                                      a?.item?.postId !== item?.item?.postId &&
                                      item?.chosenSize == a?.chosenSize
                                  );
                                } else {
                                  actual = {
                                    ...actual,
                                    chosenAmount: actual?.chosenAmount - 1,
                                  };

                                  arr[
                                    arr.findIndex(
                                      (a) =>
                                        a?.item?.postId == item?.item?.postId &&
                                        a?.chosenSize == item?.chosenSize
                                    )!
                                  ] = actual;
                                }

                                return arr;
                              })
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
                          onClick={() =>
                            setCartItems((prev) => {
                              let arr = [...prev];

                              arr = arr?.filter(
                                (a) =>
                                  !(
                                    a?.item?.postId == item?.item?.postId &&
                                    a?.chosenSize == item?.chosenSize
                                  )
                              );
                              return arr;
                            })
                          }
                        >
                          <ImCross color="white" size={8} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
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
                  } `}{" "}
                  {cartItems?.length > 0
                    ? (
                        Number(
                          cartItems?.reduce(
                            (accumulator, item) =>
                              accumulator +
                              item?.chosenAmount * Number(item?.item?.price),
                            0
                          )
                        ) /
                        Number(
                          context?.oracleData?.find(
                            (oracle) =>
                              oracle.currency?.toLowerCase() ===
                              ACCEPTED_TOKENS?.find(
                                (item) => item?.[1] == checkoutCurrency
                              )?.[2]?.toLowerCase()
                          )?.rate
                        )
                      )?.toFixed(3)
                    : 0}
                </div>
              </div>
              <div className="relative flex flex-col gap-1.5 items-center justify-center">
                <div className="relative w-fit h-fit flex items-center justify-center font-vcr text-white text-xs">
                  Choose Payment Currency
                </div>
                <div className="relative w-3/4 justify-center items-center flex flex-row gap-1">
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
                {chainId !== 232 && address && (
                  <div className="relative break-words text-xs font-vcr text-ballena flex items-center justify-center  text-center">{`( switch to lens network )`}</div>
                )}
                <div
                  className={`relative w-3/4 h-12 border border-moda bg-azul text-ballena font-vcr items-center justify-center flex ${
                    !purchaseLoading && "cursor-pointer active:scale-95"
                  }`}
                  onClick={
                    !address
                      ? () => openOnboarding()
                      : address && chainId !== 232
                      ? () => openSwitchNetworks()
                      : address && !context?.lensConectado?.sessionClient
                      ? () => handleLensConnect()
                      : approved
                      ? () =>
                          !purchaseLoading && !lensLoading && purchaseItems()
                      : () =>
                          !purchaseLoading &&
                          !lensLoading &&
                          handleApproveSpend()
                  }
                >
                  <div
                    className={`relative w-fit h-fit flex justify-center items-center ${
                      (purchaseLoading || lensLoading) && "animate-spin"
                    }`}
                  >
                    {purchaseLoading || lensLoading ? (
                      <AiOutlineLoading size={15} color={"white"} />
                    ) : !address ? (
                      "CONNECT"
                    ) : address && chainId !== 232 ? (
                      "SWITCH NETWORK"
                    ) : address && !context?.lensConectado?.sessionClient ? (
                      "CONNECT LENS"
                    ) : cartItems?.length > 0 ? (
                      !approved ? (
                        "APPROVE SPEND"
                      ) : (
                        "CHECKOUT"
                      )
                    ) : (
                      "ADD TO CART"
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
