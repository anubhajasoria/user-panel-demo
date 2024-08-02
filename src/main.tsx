import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { routes } from "./router/Routes.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./store/store";
import { Provider } from "react-redux";

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
