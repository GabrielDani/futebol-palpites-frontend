import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../Input";
import { Button } from "../Button";
import { handleApiError } from "../../../utils/handleApiError";
import { FaExclamationCircle } from "react-icons/fa";
import { AuthService } from "../../../services/authService";

export const RegisterForm = () => {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    setLoading(true);
    try {
      await AuthService.register({ nickname, password });
      navigate("/login");
    } catch (e) {
      console.error("[RegisterForm] ", e);
      setError(handleApiError(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister} className="flex flex-col space-y-4">
      <Input
        type="text"
        placeholder="Nickname"
        variant="minimal"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        required
      />
      <Input
        type="password"
        placeholder="Senha"
        variant="minimal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Input
        type="password"
        placeholder="Confirmar senha"
        variant="minimal"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      {error && (
        <div className="flex items-center text-red-500 text-sm">
          <FaExclamationCircle className="mr-2" />
          {error}
        </div>
      )}
      <Button type="submit" isLoading={isLoading} className="mt-4">
        Criar Conta
      </Button>
    </form>
  );
};
