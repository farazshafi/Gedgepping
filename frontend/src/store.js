import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({});

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

export default store;
