import axios from "axios";
import store from "../store";
import { setLoading } from "../store/slices/loading-slice";
import { clearUser } from "../store/slices/auth-slice";
const api = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
});
console.log("api", api);

api.interceptors.request.use((config) => {
  store.dispatch(setLoading(true));
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
api.interceptors.response.use(
  (response) => {
    store.dispatch(setLoading(false));
    return response;
  },
  (error) => {
    store.dispatch(setLoading(false));

    if (error.response?.status === 401) {
      store.dispatch(clearUser());
    }

    return Promise.reject(error);
  },
);
export default api;
