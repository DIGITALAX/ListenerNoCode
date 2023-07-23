import { FunctionComponent } from "react";
import { AllShop, CartItem, ShopItemProps } from "../types/shop.types";
import Image from "next/legacy/image";
import { INFURA_GATEWAY } from "../../../../lib/constants";
import { setCartItems } from "../../../../redux/reducers/cartItemsSlice";
import { setAllShop } from "../../../../redux/reducers/allShopSlice";
import { setModalOpen } from "../../../../redux/reducers/modalOpenSlice";

const ShopItem: FunctionComponent<ShopItemProps> = ({
  item,
  dispatch,
  allCartItems,
  currentIndexItem,
  setCurrentIndexItem,
  keyIndex,
  allShopItems,
}): JSX.Element => {
  return (
    <div className="relative w-60 h-full bg-black rounded-md border-2 border-moda flex flex-col">
      <div className="relative w-full h-full">
        <Image
          layout="fill"
          objectFit="cover"
          src={`${INFURA_GATEWAY}/ipfs/${
            item?.uri?.images?.[currentIndexItem[keyIndex]]?.split(
              "ipfs://"
            )?.[1]
          }`}
          className="rounded-md"
          draggable={false}
          key={item?.uri?.images?.[currentIndexItem[keyIndex]]}
        />
      </div>
      <div className="absolute top-2 left-1 w-fit h-fit items-center justify-center flex flex-row gap-4">
        <div
          className="relative w-4 h-4 flex items-center justify-center cursor-pointer active:scale-95 rotate-180 border border-ballena"
          onClick={() => {
            const newItems = [...currentIndexItem];
            newItems[keyIndex] =
              (currentIndexItem[keyIndex] - 1 + item?.uri?.images?.length) %
              item?.uri?.images?.length;
            console.log({ newItems });
            setCurrentIndexItem(newItems);
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
            const newItems = [...currentIndexItem];
            newItems[keyIndex] =
              (currentIndexItem[keyIndex] + 1) % item?.uri?.images?.length;

            setCurrentIndexItem(newItems);
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
          {item?.name}
        </div>
        <div className="relative flex flex-row gap-2 w-full h-fit items-center">
          <div className="relative flex flex-row gap-2 w-full h-fit">
            {item?.sizes?.map((size: string, index: number) => {
              return (
                <div
                  key={index}
                  className={`relative rounded-full text-xs w-5 h-5 font-vcr flex items-center justify-center cursor-pointer active:scale-95 ${
                    item?.chosenSize === size
                      ? "border border-ballena bg-white text-black"
                      : "border border-moda bg-black text-white"
                  }`}
                  onClick={() => {
                    const updated = allShopItems.map((obj: AllShop) =>
                      obj.name === item.name
                        ? { ...obj, chosenSize: size }
                        : obj
                    );

                    dispatch(setAllShop(updated));
                  }}
                >
                  {size}
                </div>
              );
            })}
          </div>
          <div
            className="relative text-xl text-white font-vcr flex justify-end ml-auto w-5 items-center h-4 cursor-pointer active:scale-95"
            onClick={() => {
              if (
                allCartItems?.reduce(
                  (total, item) => total + Number(item.amount),
                  0
                ) >= 5
              ) {
                dispatch(
                  setModalOpen({
                    actionOpen: true,
                    actionMessage: "Only 5 items in the cart at a time.",
                    actionImage:
                      "QmUzzkGb1HKfixUnyKbVDHVb9TG9nYpdYQhL6uZckRETow",
                  })
                );
                return;
              }

              let { sizes, prices, ...newObj } = item;
              const existing = [...allCartItems].findIndex(
                (item) => item?.name === newObj.name
              );

              let newCartItems: CartItem[] = [...allCartItems];

              if (existing !== -1) {
                newCartItems = [
                  ...newCartItems.slice(0, existing),
                  {
                    ...newCartItems[existing],
                    amount: newCartItems[existing].amount + 1,
                    price: Number(item?.prices?.[0]),
                  },
                  ...newCartItems.slice(existing + 1),
                ];
              } else {
                newCartItems.push({
                  ...newObj,
                  amount: 1,
                  price: Number(item?.prices?.[0]),
                });
              }

              dispatch(setCartItems(newCartItems));
            }}
          >
            <Image
              src={`${INFURA_GATEWAY}/ipfs/QmcDmX2FmwjrhVDLpNii6NdZ4KisoPLMjpRUheB6icqZcV`}
              layout="fill"
              objectFit="cover"
              draggable={false}
              alt="preRoll"
            />
          </div>
        </div>
        <div className="relative flex flex-row gap-2 w-full h-fit items-center">
          <div className="relative font-vcr flex justify-start items-start w-fit h-fit text-ballena">
            ${Number(item?.prices?.[0])}
          </div>
          <div className="relative font-vcr flex justify-start items-start w-fit h-fit text-ballena text-xs ml-auto">
            {item?.mintedTokens?.length} / {item?.amount}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopItem;
