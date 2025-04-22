import {
  FiAward,
  FiBarChart2,
  FiCalendar,
  FiSettings,
  FiUsers,
} from "react-icons/fi";
import { Link } from "react-router-dom";

interface AdminCard {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  color: string;
}

interface AdminCardGridProps {
  cards?: AdminCard[];
}

const defaultCards = [
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

export const AdminCardGrid = ({ cards = defaultCards }: AdminCardGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <AdminCard key={index} {...card} />
      ))}
    </div>
  );
};

const AdminCard = ({ title, description, icon, path, color }: AdminCard) => {
  return (
    <Link
      to={path}
      className={`
        block p-6 rounded-xl shadow-lg hover:shadow-xl 
        transition-all duration-300 bg-white hover:-translate-y-1
        border border-gray-100 hover:border-indigo-200
        group overflow-hidden
      `}
    >
      <div className="flex items-center mb-4">
        <div
          className={`p-3 rounded-lg ${color} mr-4 group-hover:scale-110 transition-transform`}
        >
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <p className="text-gray-500 text-sm mt-1">{description}</p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-300 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
    </Link>
  );
};
