import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  register_loading: false,
  error: {},
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    postRegisterBegin: (state) => {
      state.register_loading = true;
      state.error = {};
    },
    postRegisterSuccess: (state) => {
      state.register_loading = false;
    },
    postRegisterFail: (state, action) => {
      state.register_loading = false;
      state.error = action.payload.error.response.data;
    },
  },
});

export const { postRegisterBegin, postRegisterSuccess, postRegisterFail } =
  registerSlice.actions;

export default registerSlice.reducer;
