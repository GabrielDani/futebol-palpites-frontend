// pages/admin/components/AdminCardGrid.tsx
import { Link } from "react-router-dom";

interface AdminCard {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  color: string;
}

interface AdminCardGridProps {
  cards: AdminCard[];
}

export const AdminCardGrid = ({ cards }: AdminCardGridProps) => {
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
      className={`block p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-white hover:transform hover:-translate-y-1 ${color}`}
    >
      <div className="flex items-center mb-4">
        <div className={`p-3 rounded-full ${color.split(" ")[0]} mr-4`}>
          {icon}
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </Link>
  );
};
