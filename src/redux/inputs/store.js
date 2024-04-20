import { configureStore } from '@reduxjs/toolkit';
import inputReducer from './inputreducer';

const store = configureStore({
  reducer: inputReducer,
});

export default store;