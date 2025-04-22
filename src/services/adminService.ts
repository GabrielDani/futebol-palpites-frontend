import { DashboardMetrics } from "../types/admin";
import { api } from "./api";

export const AdminService = {
  getDashboardMetrics: async (): Promise<DashboardMetrics> => {
    console.log(
      "[AdminService][dashboardMetrics] Buscando dados para Dashboard..."
    );
    const { data } = await api.get("/admin/dashboard/metrics");
    console.log("[AdminService][dashboardMetrics] Métricas:", data);
    return data;
  },
};
