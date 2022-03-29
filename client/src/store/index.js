import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/auth";
import siswaReducer from "./slice/siswa";

export default configureStore({
  reducer: {
    auth: authReducer,
    siswa: siswaReducer,
  },
});
