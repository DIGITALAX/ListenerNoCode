import { FunctionComponent } from "react";
import { AllShop, AllShopProps } from "../types/shop.types";
import ShopItem from "./ShopItem";
import Image from "next/legacy/image";
import { INFURA_GATEWAY } from "../../../../lib/constants";
import Link from "next/link";

const AllShop: FunctionComponent<AllShopProps> = ({
  allShopItems,
  dispatch,
  currentIndex,
  setCurrentIndex,
  allCartItems,
  currentIndexItem,
  setCurrentIndexItem,
  checkOutOpen,
  largeScreen,
}): JSX.Element => {
  return (
    <div className="relative h-4/5 w-full items-center justify-center flex flex-col gap-5 overflow-x-hidden">
      <div className="relative w-fit h-full flex flex-row gap-4">
        {[...Array(largeScreen ? 6 : 1)]
          .map((_, i) => allShopItems[(currentIndex + i) % allShopItems.length])
          ?.map((item: AllShop, index: number) => {
            return (
              <ShopItem
                allShopItems={allShopItems}
                allCartItems={allCartItems}
                key={index}
                item={item}
                dispatch={dispatch}
                keyIndex={index}
                currentIndexItem={currentIndexItem}
                setCurrentIndexItem={setCurrentIndexItem}
                largeScreen={largeScreen}
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
              (currentIndex - 1 + allShopItems.length) % allShopItems.length
            );
            setCurrentIndexItem(((prev: any) => {
              const newItems = [...prev];
              const last = newItems.pop();
              newItems.unshift(last);
              return newItems;
            }) as any);
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
            setCurrentIndex((currentIndex + 1) % allShopItems.length);
            setCurrentIndexItem(((prev: any) => {
              const newItems = [...prev];
              const first = newItems.shift();
              newItems.push(first);
              return newItems;
            }) as any);
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
        className="absolute bottom-0 left-2 w-fit h-fit flex text-white font-vcr text-xs cursor-pointer"
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
