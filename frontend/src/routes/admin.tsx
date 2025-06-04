import ManagementAdmins from "../pages/ManagementAdmins";
import { ProtectedRoute } from "./protectedRoute";

export const adminRoutes = [
  {
    path: "admin",
    element: <ProtectedRoute requireAdmin />,
    children: [
      { path: "manage-admins", element: <ManagementAdmins />},
      { path: "catalog", element: <h1>Gestão de Administradores</h1> },
    ],
  },
];
