import { createSlice } from "@reduxjs/toolkit";
import { login, signOut, refreshToken } from "./authThunk";

const initialState = {
  token: null,
  loading: false,
  message: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [signOut.fulfilled]: (state, action) => {
      const { message } = action.payload;
      state.message = message;
      state.loading = false;
      state.token = null;
    },
    [login.pending]: (state, action) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      const { token } = action.payload;
      state.token = token;
      state.loading = false;
    },
    [login.rejected]: (state, action) => {
      const { message } = action.payload;
      state.message = message;
      state.loading = false;
    },
    [refreshToken.fulfilled]: (state, action) => {
      const { token } = action.payload;
      state.token = token;
    },
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
