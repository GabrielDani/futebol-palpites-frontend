import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const PrivateRoute = () => {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) return <>Carregando...</>;
  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};
