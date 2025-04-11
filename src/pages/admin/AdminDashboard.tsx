import {
  FiAward,
  FiBarChart2,
  FiCalendar,
  FiSettings,
  FiUsers,
} from "react-icons/fi";
import { PageLayout } from "../../components/layout/PageLayout";
import { AdminHeader } from "../../components/ui/admin/AdminHeader";
import { AdminCardGrid } from "../../components/ui/admin/AdminCardGrid";

export const AdminDashboard = () => {
  const cards = [
    {
      title: "Gerenciar Partidas",
      description: "Crie, edite e acompanhe todas as partidas do campeonato",
      icon: <FiCalendar size={24} />,
      path: "/admin/matches",
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Gerenciar Times",
      description: "Adicione novos times ou edite os existentes",
      icon: <FiAward size={24} />,
      path: "/admin/teams",
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Gerenciar Usuários",
      description: "Controle de acesso e permissões de usuários",
      icon: <FiUsers size={24} />,
      path: "/admin/users",
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Relatórios",
      description: "Acesse relatórios e estatísticas do sistema",
      icon: <FiBarChart2 size={24} />,
      path: "/admin/reports",
      color: "bg-orange-100 text-orange-600",
    },
    {
      title: "Configurações",
      description: "Configure as preferências do sistema",
      icon: <FiSettings size={24} />,
      path: "/admin/settings",
      color: "bg-gray-100 text-gray-600",
    },
  ];
  return (
    <PageLayout>
      <AdminHeader />
      <AdminCardGrid cards={cards} />
    </PageLayout>
  );
};
