import { AnyAction, Dispatch } from "redux";

export interface AllShop {
  name: string;
  prices: string[];
  acceptedTokens: string[];
  uri: {
    images: string[];
    description: string;
  };
  amount: string;
  mintedTokens: string[];
  noLimit: boolean;
  collectionId: string;
  tokenIds: string[];
  chosenSize: string;
  sizes: string[];
}

export interface CartItem {
  collectionId: string;
  uri: {
    images: string[];
    description: string;
  };
  price: number;
  chosenSize: string;
  amount: number;
  name: string;
}

export type AllShopProps = {
  allShopItems: AllShop[];
  dispatch: Dispatch<AnyAction>;
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  allCartItems: CartItem[];
  currentIndexItem: number[];
  setCurrentIndexItem: (index: number[]) => void;
};

export type ShopItemProps = {
  keyIndex: number;
  item: AllShop;
  allShopItems: AllShop[];
  allCartItems: CartItem[];
  dispatch: Dispatch<AnyAction>;
  currentIndexItem: number[];
  setCurrentIndexItem: (index: number[]) => void;
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
  openChainModal: (() => void) | undefined;
  switchNeeded: boolean;
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
