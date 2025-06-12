import Login from "../pages/Login";
import MyShelves from "../pages/MyShelves";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import { ProtectedRoute } from "./protectedRoute";

export const authRoutes = [
  {
    path: "/",
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      { path: "my-shelves/:shelf?", element: <MyShelves /> },
      { path: "profile/", element: <Profile /> },
    ],
  },
];
