import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { productListReducer } from "./reducers/productReducers"

const rootReducer = combineReducers({
  productList: productListReducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

export default store;
