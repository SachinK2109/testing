import { createSlice } from "@reduxjs/toolkit";

const initialStateList = {
  products: [],
  newProducts: [],
  featuredProducts: [],
  todaysDealProducts: [],
  loading: false,
  success: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState: initialStateList,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setNewProducts: (state, action) => {
      state.newProducts = action.payload;
    },
    setFeaturedProducts: (state, action) => {
      state.featuredProducts = action.payload;
    },
    setTodaysDealProducts: (state, action) => {
      state.todaysDealProducts = action.payload;
    },
    addProduct: (state, action) => {
      state.products.push(action.payload); // Add the new product to the products array
    },
    updateProduct: (state, action) => {
      const index = state.products.findIndex(
        (item) => item._id === action.payload._id
      );
      if (index !== -1) {
        state.products[index] = { ...state.products[index], ...action.payload };
      }
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (item) => item._id !== action.payload.productId
      );
    },
  },
});

export const {
  setProducts,
  setNewProducts,
  setFeaturedProducts,
  setTodaysDealProducts,
  addProduct,
  updateProduct,
  removeProduct,
} = productSlice.actions;

export default productSlice.reducer;
