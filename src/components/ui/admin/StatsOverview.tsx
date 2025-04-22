import { useEffect, useState } from "react";
import { AdminService } from "../../../services/adminService";
import { DashboardMetrics } from "../../../types/admin";
import { handleApiError } from "../../../utils/handleApiError";

interface StatCardProps {
  label: string;
  value: number;
  change?: string;
}

const StatCard = ({ label, value, change }: StatCardProps) => (
  <div className="bg-indigo-900 rounded-lg p-4 border border-indigo-700 hover:border-indigo-600 transition-colors">
    <p className="text-indigo-200 text-sm">{label}</p>
    <div className="flex justify-between items-end">
      <span className="text-2xl font-bold">{value}</span>
      {change && (
        <span
          className={`text-sm ${
            change.startsWith("+") ? "text-emerald-400" : "text-rose-400"
          }`}
        >
          {change}
        </span>
      )}
    </div>
  </div>
);

export const StatsOverview = ({ className = "" }: { className?: string }) => {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const data = await AdminService.getDashboardMetrics();
        setMetrics(data);
      } catch (error) {
        console.error("[StatsOverview] Error fetching metrics:", error);
        setError(handleApiError(error));
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (error) return <div className="p-4 text-rose-500">{error}</div>;
  if (!metrics)
    return <div className="p-4 text-amber-500">No data available</div>;

  // Transform metrics into stats array
  const stats = [
    {
      label: "Partidas Hoje",
      value: metrics.todayMatches,
    },
    {
      label: "Usuários Ativos",
      value: metrics.usersCount.actual,
      change: `${metrics.usersCount.changeFromLastWeek > 0 ? "+" : ""}${
        metrics.usersCount.changeFromLastWeek
      }%`,
    },
    {
      label: "Times Cadastrados",
      value: metrics.teamsCount,
    },
  ];

  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 ${className}`}>
      {stats.map((stat) => (
        <StatCard
          key={stat.label}
          label={stat.label}
          value={stat.value}
          change={stat.change}
        />
      ))}
    </div>
  );
};
