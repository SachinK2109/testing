import { createSlice } from "@reduxjs/toolkit";

const initialStateList = {
  admintoken: null,
  isAdminAuthenticated: false,
  loading: false,
  success: false,
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState: initialStateList,
  reducers: {
    setAdminAuthentication: (state, action) => {
      state.admintoken = action.payload;
      if (state.admintoken) {
        state.isAdminAuthenticated = true;
      } else {
        state.isAdminAuthenticated = false;
      }
    },
    logoutAdmin: (state) => {
      state.admintoken = null;
      state.isAdminAuthenticated = false;
    },
  },
});

export const { setAdminAuthentication, logoutAdmin } = adminSlice.actions;

export default adminSlice.reducer;
