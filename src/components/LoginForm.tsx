import { useContext, useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { Input } from "./Input";
import { Button } from "./Button";
import { AuthContext } from "../contexts/AuthContext";

export const LoginForm = () => {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = useContext(AuthContext);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await auth?.login(nickname, password);
      alert("Login bem-sucedido");
    } catch (error) {
      console.log(error);
      alert("Erro ao fazer login");
    } finally {
      setLoading(false);
    }
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
