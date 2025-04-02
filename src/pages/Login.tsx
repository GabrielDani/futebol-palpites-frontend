import { useContext, useEffect } from "react";
import { LoginForm } from "../components/LoginForm";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.isAuthenticated) {
      navigate("/");
    }
  }, [auth, navigate]);

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
