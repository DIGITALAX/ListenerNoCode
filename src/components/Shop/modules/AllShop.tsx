import { FunctionComponent, useContext } from "react";
import { AllShop as AllShopType, AllShopProps } from "../types/shop.types";
import ShopItem from "./ShopItem";
import Image from "next/legacy/image";
import { INFURA_GATEWAY } from "../../../../lib/constants";
import Link from "next/link";
import { ModalContext } from "@/pages/_app";

const AllShop: FunctionComponent<AllShopProps> = ({
  currentIndex,
  setCurrentIndex,
  checkOutOpen,
  setCartItems,
  largeScreen,
  cartItems
}): JSX.Element => {
  const context = useContext(ModalContext);
  return (
    <div className="relative h-fit w-full items-center justify-center flex flex-col gap-5 pt-4 overflow-x-hidden overflow-y-scroll">
      <div className="relative w-fit h-full flex flex-row gap-4">
        {Number(context?.allShop?.length) > 0 &&
          [...Array(largeScreen ? 6 : 1)]
            .map(
              (_, i) =>
                context?.allShop?.[
                  (currentIndex + i) % context?.allShop?.length
                ]!
            )
            ?.map((item: AllShopType, index: number) => {
              return (
                <ShopItem
                  key={index}
                  setCartItems={setCartItems}
                  item={item}
                  keyIndex={index}
                  largeScreen={largeScreen}
                  cartItems={cartItems}
                />
              );
            })}
      </div>
      <div
        className={`relative w-full h-fit items-center justify-center flex flex-row gap-4 ${
          checkOutOpen && largeScreen && "-left-36"
        }`}
      >
        <div
          className="relative w-10 h-10 flex items-center justify-center cursor-pointer active:scale-95 rotate-180 border border-ballena"
          onClick={() => {
            setCurrentIndex(
              (currentIndex - 1 + Number(context?.allShop?.length)) %
                Number(context?.allShop?.length)
            );
            const newItems = [...context?.currentIndexItem!];
            const last = newItems.pop()!;
            newItems.unshift(last);
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
          className="relative w-10 h-10 flex items-center justify-center cursor-pointer active:scale-95 border border-ballena"
          onClick={() => {
            setCurrentIndex(
              (currentIndex + 1) % Number(context?.allShop?.length)
            );
            const newItems = [...context?.currentIndexItem!];
            const first = newItems.shift();
            newItems.push(first!);
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
      <Link
        className="relative bottom-0 items-center justify-center w-fit h-fit flex text-white font-vcr text-xs cursor-pointer"
        href={`https://themanufactory.xyz`}
        target="_blank"
        rel="noreferrer"
      >
        {`(fulfilled in nyc @ the manufactory)`}
      </Link>
    </div>
  );
};

export default AllShop;
