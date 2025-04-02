import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login.tsx";
import { PrivateRoute } from "./PrivateRoute.tsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<PrivateRoute />}>
        <Route path="/" element={<>Home</>} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
