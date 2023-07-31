import { AnyAction, Dispatch } from "redux";

export interface AllShop {
  name: string;
  prices: string[];
  uri: {
    images: string[];
    description: string;
    name: string;
  };
  amount: string;
  soldTokens: string[];
  noLimit: boolean;
  collectionId: string;
  tokenIds: string[];
  chosenSize: string;
  sizes: string[];
  fulfillerAddress: string;
  fulfillerId: string;
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
  checkOutOpen: boolean;
  largeScreen: boolean;
};

export type ShopItemProps = {
  keyIndex: number;
  item: AllShop;
  largeScreen: boolean;
  allShopItems: AllShop[];
  allCartItems: CartItem[];
  dispatch: Dispatch<AnyAction>;
  currentIndexItem: number[];
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
    country: string;
  };
  largeScreen: boolean;
  setCheckoutOpen: (e: boolean) => void;
  checkOutOpen: boolean;
  setFulfillmentDetails: (e: {
    name: string;
    contact: string;
    address: string;
    zip: string;
    city: string;
    state: string;
    country: string;
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
    country: string;
  };
  setFulfillmentDetails: (e: {
    name: string;
    contact: string;
    address: string;
    zip: string;
    city: string;
    state: string;
    country: string;
  }) => void;
};
