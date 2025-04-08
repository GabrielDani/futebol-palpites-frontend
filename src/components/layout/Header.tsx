import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { FiLogOut } from "react-icons/fi";

export const Header = () => {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-gray-900 border-b border-gray-700 backdrop-blur-sm bg-opacity-90">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
            aria-label="Página inicial"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-md text-gray-900 font-bold">
              ⚽
            </div>
            <h1 className="text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors duration-200">
              Bolão de Futebol
            </h1>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-6">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-300 hover:text-red-400 hover:cursor-pointer transition-colors duration-100 group"
                aria-label="Sair da conta"
              >
                <span className="mr-1">Sair</span>
                <FiLogOut className="text-lg opacity-90 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-colors duration-200"
                  aria-label="Fazer login"
                >
                  Entrar
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-2 rounded-md text-sm font-medium bg-yellow-500 text-gray-900 hover:bg-yellow-400 transition-colors duration-200"
                  aria-label="Criar nova conta"
                >
                  Criar Conta
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};
