import { LoginForm } from "../components/LoginForm";

export const Login = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-96">
        <h1 className="text-3xl font-bold text-center text-yellow-400 mb-6">
          Bolão de Futebol
        </h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
