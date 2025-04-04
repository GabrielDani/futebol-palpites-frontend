import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const Header = () => {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="flex justify-between items-center py-4 px-6 bg-gray-800 text-white">
      <Link to="/">
        <h1 className="text-2xl font-bold">Bolão de Futebol</h1>
      </Link>
      <nav>
        {isAuthenticated ? (
          <button
            className="bg-red-500 px-4 py-2 rounded"
            onClick={handleLogout}
          >
            Sair
          </button>
        ) : (
          <nav>
            <Link to="/login" className="mr-5">
              Entrar
            </Link>
            <Link to="/register" className="">
              Criar Conta
            </Link>
          </nav>
        )}
      </nav>
    </header>
  );
};
