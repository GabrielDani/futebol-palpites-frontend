// routes/AppRoutes.tsx
import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/public/Home.tsx";
import { Login } from "../pages/public/Auth/Login.tsx";
import { Register } from "../pages/public/Auth/Register.tsx";
import { PrivateRoute } from "./PrivateRoute.tsx";
import { PublicRoute } from "./PublicRoute.tsx";
import { Dashboard } from "../pages/private/Dashboard.tsx";
import { Guess } from "../pages/private/Guess.tsx";
import { AdminRoute } from "./AdminRoute.tsx";
import { AdminDashboard } from "../pages/admin/dashboard/AdminDashboard.tsx";
import { RouteTypeProvider } from "../contexts/RouteTypeProvider.tsx";
import { RouteType } from "../types/route.ts";
import { MatchesManager } from "../pages/admin/Matches/index.tsx";
import { Groups } from "../pages/private/Groups/Groups.tsx";
import { GroupDetails } from "../pages/private/GroupDetails/GroupDetails.tsx";
import { RankingPage } from "../pages/private/Ranking/RankingPage.tsx";
import { NotFoundPage } from "../components/layout/NotFoundPage.tsx";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route
        element={
          <RouteTypeProvider value={RouteType.PUBLIC}>
            <PublicRoute />
          </RouteTypeProvider>
        }
      >
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Rotas Privadas */}
      <Route
        element={
          <RouteTypeProvider value={RouteType.PRIVATE}>
            <PrivateRoute />
          </RouteTypeProvider>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/palpites" element={<Guess />} />
        <Route path="/grupos" element={<Groups />} />
        <Route path="/grupos/:groupId" element={<GroupDetails />} />
        <Route path="/ranking" element={<RankingPage />} />
      </Route>

      {/* Rotas de Admin */}
      <Route
        element={
          <RouteTypeProvider value={RouteType.ADMIN}>
            <AdminRoute />
          </RouteTypeProvider>
        }
      >
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/matches" element={<MatchesManager />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
