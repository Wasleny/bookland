import AdministratorManagement from "../pages/AdministratorManagement";
import Authors from "../pages/Authors";
import Books from "../pages/Books";
import CatalogManagement from "../pages/CatalogManagement";
import Series from "../pages/Series";
import { ProtectedRoute } from "./protectedRoute";

export const adminRoutes = [
  {
    path: "admin",
    element: <ProtectedRoute requireAdmin />,
    children: [
      { path: "manage-admins", element: <AdministratorManagement /> },
      {
        path: "manage-catalog",
        element: <CatalogManagement />,
      },
      { path: "series", element: <Series /> },
      { path: "authors", element: <Authors /> },
      { path: "books", element: <Books /> },
    ],
  },
];
