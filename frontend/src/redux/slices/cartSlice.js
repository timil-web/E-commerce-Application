import { createSlice } from '@reduxjs/toolkit';

/**
 * Cart Slice
 * Manages cart state using Redux Toolkit
 * Includes actions for add, update, remove, and clear cart
 */

const initialState = {
  items: [], // Array of cart items with { productId, quantity, product }
  totalItems: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    /**
     * Add item to cart or update quantity if it already exists
     * @param {Object} action.payload - { product, quantity }
     */
    addToCart: (state, action) => {
      const { product, quantity } = action.payload;
      const existingItemIndex = state.items.findIndex(
        item => item.productId === product.id
      );

      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        state.items[existingItemIndex].quantity = quantity;
      } else {
        // Add new item
        state.items.push({
          productId: product.id,
          quantity,
          product,
        });
      }

      // Recalculate totals
      cartSlice.caseReducers.calculateTotals(state);
    },

    /**
     * Update quantity of an item in cart
     * @param {Object} action.payload - { productId, quantity }
     */
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find(item => item.productId === productId);

      if (item) {
        item.quantity = quantity;
        cartSlice.caseReducers.calculateTotals(state);
      }
    },

    /**
     * Remove item from cart
     * @param {String} action.payload - productId
     */
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter(item => item.productId !== productId);
      cartSlice.caseReducers.calculateTotals(state);
    },

    /**
     * Clear entire cart
     */
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
    },

    /**
     * Set cart from backend response (for session persistence)
     * @param {Array} action.payload - items array
     */
    setCart: (state, action) => {
      state.items = action.payload;
      cartSlice.caseReducers.calculateTotals(state);
    },

    /**
     * Calculate total items and total price
     * Helper reducer called internally
     */
    calculateTotals: (state) => {
      let totalItems = 0;
      let totalPrice = 0;

      state.items.forEach(item => {
        totalItems += item.quantity;
        totalPrice += item.product.price * item.quantity;
      });

      state.totalItems = totalItems;
      state.totalPrice = totalPrice;
    },
  },
});

export const {
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
  setCart,
} = cartSlice.actions;

export default cartSlice.reducer;