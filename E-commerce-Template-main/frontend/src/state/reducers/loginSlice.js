import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login_loading: false,
  error: {},
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginBegin: (state) => {
      state.login_loading = true;
      state.error = {};
    },
    loginSuccess: (state) => {
      state.login_loading = false;
    },
    loginFail: (state, action) => {
      state.login_loading = false;
      state.error = action.payload.error.response.data;
    },
  },
});

export const { loginBegin, loginSuccess, loginFail } = loginSlice.actions;

export default loginSlice.reducer;
