import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export const PublicRoute = () => {
  const auth = useContext(AuthContext);

  if (auth?.isLoading) {
    return <>Carregando...</>;
  }

  return auth?.isAuthenticated ? <Navigate to="/dashboard" /> : <Outlet />;
};
