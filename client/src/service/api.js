import axios from "axios";
const api = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:3660/api/",
});
export default api;
