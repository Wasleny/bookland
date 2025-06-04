import { Navigate, Outlet } from "react-router";
import { useAuth } from "../hooks/useAuth";

interface ProtectedRouteProps {
  requireAdmin?: boolean;
}

export const ProtectedRoute = ({ requireAdmin }: ProtectedRouteProps) => {
  const { currentUser, isLoading } = useAuth();

  if (isLoading) return <div>Carregando...</div>;

  if (!currentUser) return <Navigate to="login" />;

  if (requireAdmin && currentUser.role !== "admin") return <Navigate to="/" />;

  return <Outlet />;
};
