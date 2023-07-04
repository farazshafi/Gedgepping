import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { productListReducer, productDetailsReducer } from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";

const rootReducer = combineReducers({
  cart: cartReducer,  // Place cart reducer first
  productList: productListReducer,
  productDetails: productDetailsReducer,
});

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const initialState = {
  cart: { cartItems: cartItemsFromStorage },
};

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
  preloadedState: initialState, // Use preloadedState instead of initialState
});

export default store;
