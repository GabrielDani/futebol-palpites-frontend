import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login.tsx";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
