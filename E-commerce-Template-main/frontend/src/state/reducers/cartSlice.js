import { createSlice } from "@reduxjs/toolkit";

const initialStateList = {
  cart: [],
  loading: false,
  success: false,
  error: null,
};

export const isProductInCart = (state, productId) =>
  state.cart.cart.some((item) => item.productId._id === productId);

const cartSlice = createSlice({
  name: "cart",
  initialState: initialStateList,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    addToCart: (state, action) => {
      const { data, quantity } = action.payload;
      const itemExist = state.cart.find(
        (item) => item.productId._id === data._id
      );
      if (!itemExist) {
        const newItem = { productId: data, quantity: quantity };
        state.cart = [...state.cart, newItem];
      } else {
        itemExist.quantity += quantity;
      }
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      console.log(productId);
      const item = state.cart.find((item) => item.productId._id === productId);
      console.log(item);
      if (item) {
        item.quantity = quantity;
        console.log(item.quantity);
      }
    },
    removeCartItem: (state, action) => {
      const productId = action.payload;
      const item = state.cart.filter(
        (item) => item.productId._id !== productId
      );
      state.cart = item;
    },
    clearCartItems: (state) => {
      state.cart = [];
    },
  },
});

export const {
  setCart,
  addToCart,
  updateQuantity,
  removeCartItem,
  clearCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;
