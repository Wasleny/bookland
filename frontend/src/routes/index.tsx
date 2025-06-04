import { createBrowserRouter } from "react-router";
import { authRoutes } from "./auth";
import { adminRoutes } from "./admin";
import Layout from "../pages/Layout";
import { appRoutes } from "./app";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [...appRoutes, ...authRoutes, ...adminRoutes],
  },
]);
