import { Route, Routes } from "react-router-dom";
import Home from "../pages/public/Home.tsx";
import Login from "../pages/public/Auth/Login.tsx";
import Register from "../pages/public/Auth/Register.tsx";
import { PrivateRoute } from "./PrivateRoute.tsx";
import { PublicRoute } from "./PublicRoute.tsx";
import { Dashboard } from "../pages/private/Dashboard.tsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
