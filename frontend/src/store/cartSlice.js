import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // Array to store course IDs in the cart
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.items.push(action.payload); // Add course ID to the cart
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(id => id !== action.payload); // Remove course ID from the cart
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
