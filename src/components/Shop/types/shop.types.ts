import { SetStateAction } from "react";
import { Details } from "@/components/Account/types/account.types";
import { Account } from "@lens-protocol/client";

export interface AllShop {
  amount: string;
  uri: string;
  postId: string;
  printType: string;
  price: string;
  acceptedTokens: string[];
  designer: string;
  tokenIdsMinted: string[];
  collectionId: string;
  unlimited: boolean;
  origin: string;
  metadata: {
    access: string[];
    visibility: string;
    colors: string[];
    sizes: string[];
    mediaCover: string;
    description: string;
    title: string;
    tags: string[];
    prompt: string;
    mediaTypes: string[];
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
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  checkOutOpen: boolean;
  largeScreen: boolean;
  cartItems: CartItem[];
  setCartItems: (e: SetStateAction<CartItem[]>) => void;
};

export type ShopItemProps = {
  keyIndex: number;
  item: AllShop;
  largeScreen: boolean;
  setCartItems: (e: SetStateAction<CartItem[]>) => void;
  cartItems: CartItem[];
};

export type CheckoutProps = {
  cartItems: CartItem[];
  setCartItems: (e: SetStateAction<CartItem[]>) => void;
  purchaseLoading: boolean;
  purchaseItems: () => Promise<void>;
  setCheckoutCurrency: (e: string) => void;
  checkoutCurrency: string;
  fulfillmentDetails: Details;
  largeScreen: boolean;
  setCheckoutOpen: (e: boolean) => void;
  checkOutOpen: boolean;
  setFulfillmentDetails: (e: Details) => void;
  approved: boolean;
  handleApproveSpend: () => Promise<void>;
  address: boolean;
};

export type ShippingInfoProps = {
  fulfillmentDetails: Details;
  setFulfillmentDetails: (e: Details) => void;
};
