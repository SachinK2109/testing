import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import loginSlice from "./loginSlice";
import registerSlice from "./registerSlice";
import cartSlice from "./cartSlice";
import productSlice from "./productSlice";
import adminSlice from "./adminSlice";
import orderSlice from "./orderSlice";

const rootReducer = combineReducers({
  login: loginSlice,
  register: registerSlice,
  user: userSlice,
  cart: cartSlice,
  products: productSlice,
  admin: adminSlice,
  order: orderSlice,
});

export default rootReducer;
