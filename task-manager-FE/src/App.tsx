import { Provider } from "react-redux";
import "./App.css";
import { ToastProvider } from "./context/toast-context";
import AppRoutes from "./router/app-routes";
import store from "./store";
import Loader from "./components/UI/loader";
import { CustomThemeProvider } from "./context/theme-context";

function App() {
  return (
    <Provider store={store}>
      <CustomThemeProvider>
        <ToastProvider>
          <Loader />
          <AppRoutes />
        </ToastProvider>
      </CustomThemeProvider>
    </Provider>
  );
}

export default App;
