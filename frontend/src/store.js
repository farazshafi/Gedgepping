import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { productListReducer, productDetailsReducer } from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer
} from "./reducers/userReducers"
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderListMyReducer,
} from './reducers/orderReducers'

const rootReducer = combineReducers({
  cart: cartReducer,  // Place cart reducer first
  productList: productListReducer,
  productDetails: productDetailsReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderListMy: orderListMyReducer,
});

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo")) : null;


const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}

const paymentMethodFromStorage = localStorage.getItem('paymentMethod')
  ? JSON.parse(localStorage.getItem('paymentMethod')) : {}


const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage,
  }, userLogin: { userInfo: userInfoFromStorage }
};

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
  preloadedState: initialState, // Use preloadedState instead of initialState
});

export default store;
