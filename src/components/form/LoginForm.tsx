import { useContext, useState } from "react";
import { FaUser, FaLock, FaExclamationCircle } from "react-icons/fa";
import { Input } from "../input/Input";
import { Button } from "../button/Button";
import { AuthContext } from "../../contexts/AuthContext";
import { handleApiError } from "../../utils/handleApiError";

const LoginForm = () => {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const auth = useContext(AuthContext);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await auth?.login({ nickname, password });
    } catch (e) {
      console.log(e);
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
