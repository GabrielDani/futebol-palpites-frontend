import { useState } from "react";
import { FaUser, FaLock, FaExclamationCircle } from "react-icons/fa";
import { handleApiError } from "../../../utils/handleApiError";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { Button } from "../Button";
import { InputAuth } from "./InputAuth";

export const LoginForm = () => {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login({ nickname, password });
      navigate("/dashboard");
    } catch (e) {
      console.error("[LoginForm] Erro no Login: ", e);
      setError(handleApiError(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col space-y-4">
      <InputAuth
        type="text"
        placeholder="Nickname"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        icon={<FaUser />}
        required
      />
      <InputAuth
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        icon={<FaLock />}
        required
      />
      {error && (
        <div className="flex items-center text-red-500 text-sm mt-2">
          <FaExclamationCircle className="mr-2" />
          {error}
        </div>
      )}
      <Button type="submit" isLoading={loading} className="mt-4">
        Entrar
      </Button>
    </form>
  );
};
