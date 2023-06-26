import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { productListReducer, productDetailsReducer } from "./reducers/productReducers"

const rootReducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

export default store;
