import { useAuth } from "../../../hooks/useAuth";

type GreetingsProps = {
  description?: string;
};

export const Greetings = ({ description }: GreetingsProps) => {
  const { user } = useAuth();
  const defaultDescription =
    "Bem-vindo ao sistema de bolão do Campeonato Brasileiro! Aqui você pode palpitar nos jogos, acompanhar rankings e disputar com seus amigos";

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-semibold">
        Olá, <span className="text-yellow-400">{user?.nickname}</span> 👋
      </h1>
      <p className="text-zinc-400 mt-2 max-w-xl">
        {description || defaultDescription}
      </p>
    </div>
  );
};
