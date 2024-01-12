import { createSlice } from "@reduxjs/toolkit";

const initialStateList = {
  user: {},
  token: null,
  isAuthenticated: false,
  isEdit: false,
  loading: false,
  success: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialStateList,
  reducers: {
    setAuthentication: (state, action) => {
      state.token = action.payload;
      if (state.token) {
        state.isAuthenticated = true;
      } else {
        state.isAuthenticated = false;
      }
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    updateEdit: (state) => {
      state.isEdit = !!state.isEdit;
    },
    updateUser: (state, action) => {
      const updatedUser = action.payload;
      state.user = updatedUser;
    },
    logoutUser: (state) => {
      state.user = {};
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const {
  setAuthentication,
  setUser,
  updateEdit,
  updateUser,
  logoutUser,
} = userSlice.actions;

export default userSlice.reducer;
