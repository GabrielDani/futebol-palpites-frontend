import { useAuth } from "../../../../hooks/useAuth";

export const GuessGreatings = () => {
  const { user } = useAuth();

  return (
    <div className="">
      <h1 className="text-3xl font-bold text-yellow-400 mb-4">
        Faça seus palpites
      </h1>
      <p className="text-gray-300 mb-6">
        Bem-vindo, {user?.nickname}! Aqui você pode dar seus palpites para os
        jogos da rodada. Preencha os placares que você acredita que vão
        acontecer e envie seus palpites. Quanto mais jogos você acertar, mais
        pontos ganha no ranking!
      </p>
    </div>
  );
};
