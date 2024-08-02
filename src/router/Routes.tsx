import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Profile from "../pages/Profile";

export const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
        // loader: teamLoader,
      },
      {
        path: "/profile",
        element: <Profile />,
        // loader: teamLoader,
      },
    ],
  },
];
