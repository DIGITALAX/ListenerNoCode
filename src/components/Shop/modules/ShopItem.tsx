import { FunctionComponent, useContext } from "react";
import { AllShop, CartItem, ShopItemProps } from "../types/shop.types";
import Image from "next/legacy/image";
import { INFURA_GATEWAY } from "../../../../lib/constants";
import { ModalContext } from "@/pages/_app";

const ShopItem: FunctionComponent<ShopItemProps> = ({
  item,
  keyIndex,
  largeScreen,
  setCartItems,
  cartItems,
}): JSX.Element => {
  const context = useContext(ModalContext);
  return (
    <div
      className={`relative h-96 bg-black rounded-md border-2 border-moda flex flex-col ${
        largeScreen ? "w-60" : "w-72"
      }`}
    >
      <div className="relative w-full h-full">
        {item?.metadata?.images?.[
          context?.currentIndexItem?.[keyIndex || 0]!
        ] && (
          <Image
            layout="fill"
            objectFit="cover"
            src={`${INFURA_GATEWAY}/ipfs/${
              item?.metadata?.images?.[
                context?.currentIndexItem?.[keyIndex || 0]!
              ]?.split("ipfs://")?.[1]
            }`}
            className="rounded-md"
            draggable={false}
            key={
              item?.metadata?.images?.[
                context?.currentIndexItem?.[keyIndex || 0]!
              ]
            }
          />
        )}
      </div>
      <div className="absolute top-2 left-1 w-fit h-fit items-center justify-center flex flex-row gap-4">
        <div
          className="relative w-4 h-4 flex items-center justify-center cursor-pointer active:scale-95 rotate-180 border border-ballena"
          onClick={() => {
            const newItems = [...(context?.currentIndexItem || [])];
            newItems[keyIndex] =
              (context?.currentIndexItem?.[keyIndex]! -
                1 +
                item?.metadata?.images?.length) %
              item?.metadata?.images?.length;
            context?.setCurrentIndexItem(newItems);
          }}
        >
          <Image
            layout="fill"
            draggable={false}
            src={`${INFURA_GATEWAY}/ipfs/QmTCSKXWgkj7wuXLP5obJFmdvZHXYi3FffeyDQPL89YaXr`}
          />
        </div>
        <div
          className="relative w-4 h-4 flex items-center justify-center cursor-pointer active:scale-95 border border-ballena"
          onClick={() => {
            const newItems = [...(context?.currentIndexItem || [])];
            newItems[keyIndex] =
              (context?.currentIndexItem?.[keyIndex]! + 1) %
              item?.metadata?.images?.length;

            context?.setCurrentIndexItem(newItems);
          }}
        >
          <Image
            layout="fill"
            draggable={false}
            src={`${INFURA_GATEWAY}/ipfs/QmTCSKXWgkj7wuXLP5obJFmdvZHXYi3FffeyDQPL89YaXr`}
          />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 h-20 bg-black/70 w-full flex flex-col rounded-b-md border-t border-white px-2 py-1 justify-between items-center">
        <div className="relative w-full h-fit flex flex-col cursor-pointer text-xs text-white font-vcr">
          {item?.metadata?.title}
        </div>
        <div className="relative flex flex-row gap-2 w-full h-fit items-center">
          <div className="relative flex flex-row gap-2 w-full h-fit">
            {item?.metadata?.sizes?.map((size: string, index: number) => {
              return (
                <div
                  key={index}
                  className={`relative rounded-full text-xxs w-5 h-5 font-vcr flex items-center justify-center cursor-pointer active:scale-95 border border-moda bg-black text-white`}
                  onClick={() => {
                    setCartItems((prev) => {
                      let arr = [...prev];

                      let current =
                        arr[
                          arr?.findIndex(
                            (a) =>
                              a?.item?.postId == item?.postId &&
                              size == a?.chosenSize
                          )
                        ];

                      if (current) {
                        let exceeded = false;
                        if (
                          cartItems
                            ?.filter(
                              (element) => element?.item?.postId == item?.postId
                            )
                            ?.reduce(
                              (accumulator, currentItem) =>
                                accumulator + currentItem.chosenAmount,
                              0
                            ) +
                            1 >
                          Number(item?.amount)
                        ) {
                          context?.setGeneralModal({
                            open: true,
                            message:
                              "We know you're eager. You've reached this prints' collect limit.",
                            image:
                              "QmSUH38BqmfPci9NEvmC2KRQEJeoyxdebHiZi1FABbtueg",
                          });

                          exceeded = true;
                        }

                        current = {
                          ...current,
                          chosenAmount: exceeded
                            ? current?.chosenAmount
                            : Number(current?.chosenAmount) + 1,
                          chosenSize: size,
                        };
                        arr[
                          arr?.findIndex(
                            (a) =>
                              a?.item?.postId == item?.postId &&
                              size == a?.chosenSize
                          )
                        ] = current;
                      } else {
                        let exceeded = false;
                        if (
                          cartItems
                            ?.filter(
                              (element) => element?.item?.postId == item?.postId
                            )
                            ?.reduce(
                              (accumulator, currentItem) =>
                                accumulator + currentItem.chosenAmount,
                              0
                            ) +
                            1 >
                          Number(item?.amount)
                        ) {
                          context?.setGeneralModal({
                            open: true,
                            message:
                              "We know you're eager. You've reached this prints' collect limit.",
                            image:
                              "QmSUH38BqmfPci9NEvmC2KRQEJeoyxdebHiZi1FABbtueg",
                          });

                          exceeded = true;
                        }

                        if (!exceeded) {
                          current = {
                            item,
                            chosenAmount: 1,
                            chosenSize: size,
                          };

                          arr.push(current);
                        }
                      }

                      return arr;
                    });
                  }}
                >
                  {size}
                </div>
              );
            })}
          </div>
          {/* <div className="relative text-xl text-white font-vcr flex justify-end ml-auto w-5 items-center h-4 cursor-pointer active:scale-95">
            <Image
              src={`${INFURA_GATEWAY}/ipfs/QmcDmX2FmwjrhVDLpNii6NdZ4KisoPLMjpRUheB6icqZcV`}
              layout="fill"
              objectFit="cover"
              draggable={false}
              alt="preRoll"
            />
          </div> */}
        </div>
        <div className="relative flex flex-row gap-2 w-full h-fit items-center">
          <div className="relative font-vcr flex justify-start items-start w-fit h-fit text-ballena">
            ${Number(item?.price) / 10 ** 18}
          </div>
          <div className="relative font-vcr flex justify-start items-start w-fit h-fit text-ballena text-xs ml-auto">
            {Number(item?.tokenIdsMinted?.length) || 0} / {item?.amount}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopItem;
