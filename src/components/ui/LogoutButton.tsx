import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { FiLogOut } from "react-icons/fi";

export const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center text-gray-300 hover:text-red-400 hover:cursor-pointer transition-colors duration-100 group"
      aria-label="Sair da conta"
    >
      <span className="mr-1">Sair</span>
      <FiLogOut className="text-lg opacity-90 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
    </button>
  );
};
