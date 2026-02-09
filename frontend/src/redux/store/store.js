import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../slices/cartSlice';
import productsReducer from '../slices/productsSlice';

/**
 * Redux Store Configuration
 * Combines all reducers and configures middleware
 */

const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
  },
  // Redux Toolkit includes thunk middleware by default
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable for better performance with large state
    }),
});

export default store;