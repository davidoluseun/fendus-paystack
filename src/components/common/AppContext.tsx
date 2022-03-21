import * as React from "react";

type AppContextTypes = {
  state: typeof initialState;
  dispatch: React.Dispatch<AppActionTypes>;
};

type AppProviderProps = {
  children: React.ReactNode;
};

type AppStateTypes = {
  categories: CategoryTypes[];
  user: UserTypes;
  products: ProductTypes[];
  cart: CartTypes[];
  deliveryState: string;
  wishlist: WishlistTypes[];
  paymentId: string;
  profilePhoto: string | undefined;
};

type InitAppDataTypes = {
  categories: CategoryTypes[];
  products: ProductTypes[];
};

type InitAppDataWithAuthTypes = {
  categories: CategoryTypes[];
  products: ProductTypes[];
  user: UserTypes
  cart: CartTypes[];
  wishlist: WishlistTypes[];
};

export type AppActionTypes =
  | { type: "SET_CATEGORIES"; payload: CategoryTypes[] }
  | { type: "SET_USER"; payload: UserTypes }
  | { type: "SET_PRODUCTS"; payload: ProductTypes[] }
  | { type: "SET_DELIVERY_STATE"; payload: string }
  | { type: "ADD_TO_CART"; payload: CartTypes }
  | { type: "SET_CART"; payload: CartTypes[] }
  | { type: "REMOVE_FROM_CART"; payload: CartTypes }
  | { type: "INCREMENT_ITEM"; payload: CartTypes }
  | { type: "DECREMENT_ITEM"; payload: CartTypes }
  | { type: "EMPTY_CART" }
  | { type: "ADD_TO_WISHLIST"; payload: WishlistTypes }
  | { type: "MOVE_FROM_CART_TO_WISHLIST"; payload: WishlistTypes }
  | { type: "MOVE_FROM_WISHLIST_TO_CART"; payload: CartTypes }
  | { type: "ADD_WISHLIST_TO_CART" }
  | { type: "REMOVE_FROM_WISHLIST"; payload: WishlistTypes }
  | { type: "SET_WISHLIST"; payload: WishlistTypes[] }
  | { type: "SET_PAYMENT_ID"; payload: string }
  | { type: "SET_PROFILE_PHOTO"; payload: string | undefined }
  | { type: "KEEP_ORIGINAL_STATE"; payload: AppStateTypes }
  | { type: "SET_INIT_APP_DATA"; payload: InitAppDataTypes }
  | { type: "SET_INIT_APP_DATA_WITH_AUTH"; payload: InitAppDataWithAuthTypes };

const initialState: AppStateTypes = {
  categories: [],
  user: null,
  products: [],
  cart: [],
  wishlist: [],
  deliveryState: "",
  paymentId: "",
  profilePhoto: "",
};

export const AppContext = React.createContext({} as AppContextTypes);

const reducer = (state: AppStateTypes, action: AppActionTypes) => {
  let cart = [...state.cart];
  let wishlist = [...state.wishlist];
  let index: number;

  switch (action.type) {
    case "SET_INIT_APP_DATA":
      return {
        ...state,
        categories: action.payload.categories,
        products: action.payload.products,
      };
    case "SET_INIT_APP_DATA_WITH_AUTH":
      return {
        ...state,
        categories: action.payload.categories,
        products: action.payload.products,
        user: action.payload.user,
        profilePhoto: action.payload.user?.img,
        cart: action.payload.cart,
        wishlist: action.payload.wishlist,
      };

    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };

    case "SET_USER":
      return {
        ...state,
        user: action.payload,
        profilePhoto: action.payload?.img,
      };

    case "SET_PRODUCTS":
      return { ...state, products: action.payload };

    case "SET_DELIVERY_STATE":
      return { ...state, deliveryState: action.payload };

    case "SET_CART":
      return { ...state, cart: action.payload };

    case "ADD_TO_CART":
      return { ...state, cart: [action.payload, ...cart] };

    case "REMOVE_FROM_CART":
      cart = cart.filter(
        (product) => product.productId !== action.payload.productId
      );
      return { ...state, cart };

    case "INCREMENT_ITEM":
      index = cart.indexOf(action.payload);
      cart[index] = { ...action.payload };
      cart[index].qty++;

      return { ...state, cart };
    case "DECREMENT_ITEM":
      index = cart.indexOf(action.payload);
      cart[index] = { ...action.payload };
      cart[index].qty--;

      return { ...state, cart };

    case "EMPTY_CART":
      return { ...state, cart: [] };

    case "SET_WISHLIST":
      return { ...state, wishlist: action.payload };

    case "ADD_TO_WISHLIST":
      return { ...state, wishlist: [action.payload, ...wishlist] };

    case "REMOVE_FROM_WISHLIST":
      wishlist = wishlist.filter(
        (product) => product.productId !== action.payload.productId
      );
      return { ...state, wishlist };

    case "MOVE_FROM_CART_TO_WISHLIST":
      cart = cart.filter(
        (product) => product.productId !== action.payload.productId
      );
      return { ...state, cart, wishlist: [action.payload, ...wishlist] };

    case "MOVE_FROM_WISHLIST_TO_CART":
      wishlist = wishlist.filter(
        (product) => product.productId !== action.payload.productId
      );
      return { ...state, wishlist, cart: [action.payload, ...cart] };

    case "ADD_WISHLIST_TO_CART":
      const newCart = wishlist.map((product) => ({ ...product, qty: 1 }));
      return { ...state, cart: [...newCart, ...cart], wishlist: [] };

    case "SET_PAYMENT_ID":
      return { ...state, paymentId: action.payload };

    case "SET_PROFILE_PHOTO":
      return { ...state, profilePhoto: action.payload };

    case "KEEP_ORIGINAL_STATE":
      return { ...action.payload };
    default:
      return state;
  }
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
