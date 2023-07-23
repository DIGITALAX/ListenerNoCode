import { AnyAction, Dispatch } from "redux";

export interface AllShop {
  name: string;
  prices: string[];
  acceptedTokens: string[];
  uri: {
    template: string;
    images: string[];
    description: string;
  };
  amount: string;
  mintedTokens: string[];
  noLimit: boolean;
  collectionId: string;
  tokenIds: string[];
}

export interface CartItem {
  collectionId: number;
  uri: string;
  price: number;
  printType: string;
  chosenColor: string;
  chosenSize: string;
  amount: number;
  name: string;
}

export type AllShopProps = {
  allShopItems: AllShop[];
};

export type CheckoutProps = {
  cartItems: CartItem[];
  purchaseLoading: boolean;
  purchaseItems: () => Promise<void>;
  dispatch: Dispatch<AnyAction>;
  setCheckoutCurrency: (e: string) => void;
  checkoutCurrency: string;
  fulfillmentDetails: {
    name: string;
    contact: string;
    address: string;
    zip: string;
    city: string;
    state: string;
  };
  setFulfillmentDetails: (e: {
    name: string;
    contact: string;
    address: string;
    zip: string;
    city: string;
    state: string;
  }) => void;
  approved: boolean;
  handleApproveSpend: () => Promise<void>;
  oracleValue: number;
  openConnectModal: (() => void) | undefined;
  address: boolean;
};

export type ShippingInfoProps = {
  fulfillmentDetails: {
    name: string;
    contact: string;
    address: string;
    zip: string;
    city: string;
    state: string;
  };
  setFulfillmentDetails: (e: {
    name: string;
    contact: string;
    address: string;
    zip: string;
    city: string;
    state: string;
  }) => void;
};
