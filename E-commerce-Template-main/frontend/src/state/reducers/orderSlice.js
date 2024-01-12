import { createSlice } from "@reduxjs/toolkit";

const initialStateList = {
  order: [],
  allorders: [],
  loading: false,
  success: false,
  error: null,
};

// export const isProductInCart = (state, productId) =>
//   state.cart.cart.some((item) => item.productId._id === productId);

const orderSlice = createSlice({
  name: "order",
  initialState: initialStateList,
  reducers: {
    setOrder: (state, action) => {
      state.order = action.payload;
    },
    setAllOrder: (state, action) => {
      state.allorders = action.payload;
    },
  },
});

export const { setOrder, setAllOrder } = orderSlice.actions;

export default orderSlice.reducer;
