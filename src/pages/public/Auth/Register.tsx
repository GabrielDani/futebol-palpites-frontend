import { Link } from "react-router-dom";
import RegisterForm from "../../../components/ui/auth/RegisterForm";
import { Header } from "../../../components/layout/Header";

export const Register = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Header />

      <div className="flex flex-1 items-center justify-center p-4">
        <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-[24rem]">
          <h1 className="text-3xl font-bold text-center text-yellow-400 mb-6">
            Criar Conta
          </h1>
          <RegisterForm />
          <p className="text-center text-sm mt-4 text-gray-400">
            Já tem uma conta?{" "}
            <Link
              to="/login"
              className="text-yellow-400 hover:underline transition-colors"
              aria-label="Fazer login"
            >
              Entre aqui
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
