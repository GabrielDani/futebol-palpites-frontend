import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const PublicRoute = () => {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) return <>Carregando...</>;
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />;
};
