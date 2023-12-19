import { SetStateAction } from "react";
import { AnyAction, Dispatch } from "redux";
import { Profile } from "../../../../graphql/generated";
import { Details } from "@/components/Account/types/account.types";

export interface AllShop {
  amount: string;
  pubId: string;
  uri: string;
  profileId: string;
  printType: string;
  prices: string[];
  acceptedTokens: string[];
  owner: string;
  soldTokens: string;
  fulfillerPercent: string;
  fulfillerBase: string;
  fulfiller: string;
  designerPercent: string;
  dropId: string;
  dropCollectionIds: string[];
  collectionId: string;
  unlimited: boolean;
  origin: string;
  blockTimestamp: string;
  dropMetadata: {
    dropTitle: string;
    dropCover: string;
  };
  collectionMetadata: {
    access: string[];
    visibility: string;
    colors: string[];
    sizes: string[];
    mediaCover: string;
    description: string;
    communities: string[];
    title: string;
    tags: string[];
    prompt: string;
    mediaTypes: string[];
    profileHandle: string;
    microbrandCover: string;
    microbrand: string;
    images: string[];
    video: string;
    audio: string;
    onChromadin: string;
    sex: string;
    style: string;
  };
}

export interface AuthSig {
  sig: any;
  derivedVia: string;
  signedMessage: string;
  address: string;
}

export interface OracleData {
  currency: string;
  rate: string;
  wei: string;
}

export interface CartItem {
  item: AllShop;
  chosenSize: string;
  chosenAmount: number;
}

export type AllShopProps = {
  allShopItems: AllShop[];
  dispatch: Dispatch<AnyAction>;
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  currentIndexItem: number[];
  checkOutOpen: boolean;
  largeScreen: boolean;
  chosenItem: CartItem | undefined;
  setChosenItem: (e: SetStateAction<CartItem | undefined>) => void;
};

export type ShopItemProps = {
  keyIndex: number;
  item: AllShop;
  largeScreen: boolean;
  allShopItems: AllShop[];
  chosenItem: CartItem | undefined;
  setChosenItem: (e: SetStateAction<CartItem | undefined>) => void;
  dispatch: Dispatch<AnyAction>;
  currentIndexItem: number[];
};

export type CheckoutProps = {
  purchaseLoading: boolean;
  purchaseItems: () => Promise<void>;
  setCheckoutCurrency: (e: string) => void;
  checkoutCurrency: string;
  fulfillmentDetails: Details;
  largeScreen: boolean;
  setCheckoutOpen: (e: boolean) => void;
  checkOutOpen: boolean;
  chosenCartItem: CartItem | undefined;
  setChosenCartItem: (e: SetStateAction<CartItem | undefined>) => void;
  setFulfillmentDetails: (e: Details) => void;
  approved: boolean;
  handleApproveSpend: () => Promise<void>;
  openConnectModal: (() => void) | undefined;
  address: boolean;
  openChainModal: (() => void) | undefined;
  switchNeeded: boolean;
  lensConnected: Profile | undefined;
  lensSignIn: () => Promise<void>;
  lensLoading: boolean;
  oracleData: OracleData[];
};

export type ShippingInfoProps = {
  fulfillmentDetails: Details;
  setFulfillmentDetails: (e: Details) => void;
};
