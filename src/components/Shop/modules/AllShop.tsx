import { FunctionComponent } from "react";
import { AllShop, AllShopProps } from "../types/shop.types";
import ShopItem from "./ShopItem";
import Image from "next/legacy/image";
import { INFURA_GATEWAY } from "../../../../lib/constants";

const AllShop: FunctionComponent<AllShopProps> = ({
  allShopItems,
  dispatch,
  currentIndex,
  setCurrentIndex,
  allCartItems,
  currentIndexItem,
  setCurrentIndexItem,
  checkOutOpen,
  largeScreen
}): JSX.Element => {
  return (
    <div
      className="relative h-4/5 w-full items-center justify-center flex flex-col gap-5"
    >
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
              />
            );
          })}
      </div>
      <div className={`relative w-full h-fit items-center justify-center flex flex-row gap-4 ${
        checkOutOpen && largeScreen && "-left-36"
      }`}>
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
    </div>
  );
};

export default AllShop;
