import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { productListReducer, productDetailsReducer } from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import { userLoginReducer, userRegisterReducer } from "./reducers/userReducers"

const rootReducer = combineReducers({
  cart: cartReducer,  // Place cart reducer first
  productList: productListReducer,
  productDetails: productDetailsReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
});

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo")) : null;

const initialState = {
  cart: { cartItems: cartItemsFromStorage },
  userLogin : {userInfo : userInfoFromStorage}
};

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
  preloadedState: initialState, // Use preloadedState instead of initialState
});

export default store;
