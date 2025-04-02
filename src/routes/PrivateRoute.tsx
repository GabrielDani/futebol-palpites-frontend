import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Outlet, useNavigate } from "react-router-dom";

export const PrivateRoute = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth?.loading && !auth?.isAuthenticated) {
      navigate("/login");
    }
  }, [auth, navigate]);

  if (auth?.loading) {
    return <>Carregando...</>;
  }

  return auth?.isAuthenticated ? <Outlet /> : null;
};
