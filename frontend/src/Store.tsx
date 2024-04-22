import React from "react";
import { toast } from "react-toastify";
import { Cart, CartItem } from "./types/Cart.ts";
import { UserInfo } from "./types/userInfo.ts";

type AppState = {
  mode: string
  cart: Cart
  userInfo?: UserInfo
}

const initialState: AppState = {
  userInfo: localStorage.getItem( 'userInfo' )
    ? JSON.parse( localStorage.getItem( 'userInfo' )! )
    : null,

  mode: localStorage.getItem( 'mode' )
    ? localStorage.getItem( 'mode' )!
    : window.matchMedia && window.matchMedia( 'prefers-color-scheme: dark' ).matches
      ? 'dark'
      : 'light',

  cart: {
    cartItems: localStorage.getItem( 'cartItems' )
      ? JSON.parse( localStorage.getItem( 'cartItems' )! )
      : [],
    shippingAddress: localStorage.getItem( 'shippingAddress' )
      ? JSON.parse( localStorage.getItem( 'shippingAddress' )! )
      : {},
    paymentMethod: localStorage.getItem( 'paymentMethod' )
      ? localStorage.getItem( 'paymentMethod' )!
      : 'Paypal',

    // TODO: Work these values out
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0
  }

}

type Action =
  | { type: 'SWITCH_MODE' }
  | { type: 'CART_ADD_ITEM', payload: CartItem }
  | { type: 'CART_REMOVE_ITEM', payload: CartItem }
  | { type: 'USER_SIGNIN', payload: UserInfo }


function reducer( state: AppState, action: Action ): AppState {
  if ( action.type === 'SWITCH_MODE' ) {// Todo: Save Theme in local storage
    localStorage.setItem( 'mode', state.mode === 'dark' ? 'light' : 'dark' )
    return { ...state, mode: state.mode === 'dark' ? 'light' : 'dark' }
  } else if ( action.type === 'CART_ADD_ITEM' ) {
    const newItem = action.payload
    const existItem = state.cart.cartItems.find(
      ( item: CartItem ) => item._id == newItem._id
    )
    const cartItems = existItem
      ? state.cart.cartItems.map( ( item: CartItem ) =>
        item._id === existItem._id ? newItem : item
      )
      : [ ...state.cart.cartItems, newItem ]
    localStorage.setItem( 'cartItems', JSON.stringify( cartItems ) )
    return { ...state, cart: { ...state.cart, cartItems } }
  } else if ( action.type === 'CART_REMOVE_ITEM' ) {// eslint-disable-next-line no-case-declarations
    const cartItems = state.cart.cartItems.filter(
      ( item: CartItem ) => item._id !== action.payload._id
    )
    localStorage.setItem( 'cartItems', JSON.stringify( cartItems ) )
    toast.info( 'Product Removed from Cart!' )
    return { ...state, cart: { ...state.cart, cartItems } }
  } else if ( action.type === 'USER_SIGNIN' ) {
    return { ...state, userInfo: action.payload }
  } else {
    return state
  }
}

const defaultDispatch: React.Dispatch<Action> = () => initialState

const Store = React.createContext( {
  state: initialState,
  dispatch: defaultDispatch
} )

function StoreProvider( props: React.PropsWithChildren<{}> ) {
  const [ state, dispatch ] = React.useReducer<React.Reducer<AppState, Action>>(
    reducer,
    initialState
  )
  return <Store.Provider value={ { state, dispatch } } { ...props } />
}

export { Store, StoreProvider }