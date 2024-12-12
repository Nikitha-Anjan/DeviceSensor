import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'; // Ensure this file exists and correctly exports the rootReducer

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(), 
  devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development mode
});

export default store;