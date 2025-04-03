import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

export const Header = () => {
  const auth = useContext(AuthContext);

  return (
    <header className="flex justify-between items-center py-4 px-6 bg-gray-800 text-white">
      <Link to="/">
        <h1 className="text-2xl font-bold">Bolão de Futebol</h1>
      </Link>
      <nav>
        {auth?.isAuthenticated ? (
          <button
            className="bg-red-500 px-4 py-2 rounded"
            onClick={auth?.logout}
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
