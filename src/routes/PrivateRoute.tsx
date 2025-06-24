import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { LoadingPage } from "../pages/public/LoadingPage";

export const PrivateRoute = () => {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) return <LoadingPage />;
  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};
