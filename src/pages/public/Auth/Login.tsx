import { Link } from "react-router-dom";
import LoginForm from "../../../components/form/LoginForm";
import { Header } from "../../../components/header/Header";

export const Login = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Header />

      <main className="flex flex-1 items-center justify-center p-4">
        {" "}
        <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-[24rem]">
          {" "}
          <h1 className="text-3xl font-bold text-center text-yellow-400 mb-6">
            Bolão de Futebol
          </h1>
          <LoginForm />
          <nav className="flex justify-between mt-4 text-sm text-gray-400">
            {" "}
            <Link
              to="#"
              className="hover:text-white transition-colors"
              aria-label="Recuperar senha"
            >
              Esqueci minha senha
            </Link>
            <Link
              to="/register"
              className="hover:text-white transition-colors"
              aria-label="Criar nova conta"
            >
              Cadastrar-se
            </Link>
          </nav>
        </div>
      </main>
    </div>
  );
};

export default Login;
