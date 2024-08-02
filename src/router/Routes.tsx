import App from "../App";
import Home from "../pages/home/Home";
import Profile from "../pages/profile/Profile";

export const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
];
