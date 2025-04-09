import { useState } from "react";
import { FaUser, FaLock, FaExclamationCircle } from "react-icons/fa";
import { Input } from "../Input";
import { Button } from "../Button";
import { handleApiError } from "../../../utils/handleApiError";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

const LoginForm = () => {
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
      <Input
        type="text"
        placeholder="Nickname"
        className="mr-10"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        icon={<FaUser />}
        required
      />
      <Input
        type="password"
        placeholder="Senha"
        className="mr-10"
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

export default LoginForm;
