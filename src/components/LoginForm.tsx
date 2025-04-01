import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { Input } from "./Input";
import { Button } from "./Button";

export const LoginForm = () => {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Login bem-sucedido!");
    }, 2000);
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <Input
        type="text"
        placeholder="Nickname"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        icon={<FaUser />}
        required
      />
      <Input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        icon={<FaLock />}
        required
      />
      <Button type="submit" isLoading={loading}>
        Entrar
      </Button>
      <div className="flex justify-between mt-4 text-sm text-gray-400">
        <a href="#" className="hover:text-white">
          Esqueci minha senha
        </a>
        <a href="#" className="hover:text-white">
          Cadastrar-se
        </a>
      </div>
    </form>
  );
};
