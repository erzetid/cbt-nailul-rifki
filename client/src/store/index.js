import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/auth";
import siswaReducer from "./slice/siswa";
import kelasReducer from "./slice/kelas";

export default configureStore({
  reducer: {
    auth: authReducer,
    siswa: siswaReducer,
    kelas: kelasReducer,
  },
});
