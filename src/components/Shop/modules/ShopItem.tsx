import { FunctionComponent } from "react";
import { AllShop, CartItem, ShopItemProps } from "../types/shop.types";
import Image from "next/legacy/image";
import { INFURA_GATEWAY } from "../../../../lib/constants";
import { setAllShop } from "../../../../redux/reducers/allShopSlice";
import { setCurrentIndexItem } from "../../../../redux/reducers/currentIndexItemSlice";

const ShopItem: FunctionComponent<ShopItemProps> = ({
  item,
  dispatch,
  currentIndexItem,
  chosenItem,
  keyIndex,
  allShopItems,
  largeScreen,
  setChosenItem,
}): JSX.Element => {
  return (
    <div
      className={`relative h-96 bg-black rounded-md border-2 border-moda flex flex-col ${
        largeScreen ? "w-60" : "w-72"
      }`}
    >
      <div className="relative w-full h-full">
        {item?.collectionMetadata?.images?.[
          currentIndexItem[keyIndex || 0]
        ] && (
          <Image
            layout="fill"
            objectFit="cover"
            src={`${INFURA_GATEWAY}/ipfs/${
              item?.collectionMetadata?.images?.[
                currentIndexItem[keyIndex || 0]
              ]?.split("ipfs://")?.[1]
            }`}
            className="rounded-md"
            draggable={false}
            key={
              item?.collectionMetadata?.images?.[
                currentIndexItem[keyIndex || 0]
              ]
            }
          />
        )}
      </div>
      <div className="absolute top-2 left-1 w-fit h-fit items-center justify-center flex flex-row gap-4">
        <div
          className="relative w-4 h-4 flex items-center justify-center cursor-pointer active:scale-95 rotate-180 border border-ballena"
          onClick={() => {
            const newItems = [...currentIndexItem];
            newItems[keyIndex] =
              (currentIndexItem[keyIndex] -
                1 +
                item?.collectionMetadata?.images?.length) %
              item?.collectionMetadata?.images?.length;
            dispatch(setCurrentIndexItem(newItems));
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
              (currentIndexItem[keyIndex] + 1) %
              item?.collectionMetadata?.images?.length;

            dispatch(setCurrentIndexItem(newItems));
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
          {item?.collectionMetadata?.title}
        </div>
        <div className="relative flex flex-row gap-2 w-full h-fit items-center">
          <div className="relative flex flex-row gap-2 w-full h-fit">
            {item?.collectionMetadata?.sizes?.map(
              (size: string, index: number) => {
                return (
                  <div
                    key={index}
                    className={`relative rounded-full text-xxs w-5 h-5 font-vcr flex items-center justify-center cursor-pointer active:scale-95 ${
                      chosenItem?.chosenSize === size &&
                      chosenItem?.item?.collectionMetadata?.title ==
                        item?.collectionMetadata?.title
                        ? "border border-ballena bg-white text-black"
                        : "border border-moda bg-black text-white"
                    }`}
                    onClick={() => {
                      const updated = allShopItems.map((obj: AllShop) =>
                        obj?.collectionMetadata?.title ===
                        item?.collectionMetadata?.title
                          ? { ...obj, chosenSize: size }
                          : obj
                      );

                      setChosenItem((prev) => {
                        let current = { ...prev };

                        if (
                          prev?.item?.collectionMetadata?.title ==
                          item?.collectionMetadata?.title
                        ) {
                          current = {
                            ...prev,
                            chosenSize: size,
                          };
                        } else {
                          current = {
                            item,
                            chosenAmount: 1,
                            chosenSize: size,
                          };
                        }

                        return current as CartItem;
                      });

                      dispatch(setAllShop(updated));
                    }}
                  >
                    {size}
                  </div>
                );
              }
            )}
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
            ${Number(item?.prices?.[0])}
          </div>
          <div className="relative font-vcr flex justify-start items-start w-fit h-fit text-ballena text-xs ml-auto">
            {item?.soldTokens?.length || 0} / {item?.amount}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopItem;
