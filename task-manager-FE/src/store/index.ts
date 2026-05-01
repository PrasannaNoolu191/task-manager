import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/auth-slice";
import loadingReducer from "./slices/loading-slice";

// Load user from localStorage
const userFromStorage = (() => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : undefined;
  } catch {
    return undefined;
  }
})();

const store = configureStore({
  reducer: {
    user: userReducer,
    loading: loadingReducer,
  },
  preloadedState: {
    user: userFromStorage || {
      id: null,
      username: null,
      email: null,
    },
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
