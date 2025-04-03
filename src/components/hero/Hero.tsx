import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="flex-1 flex flex-col items-center justify-center text-center px-4">
      <h2 className="text-4xl font-bold mb-4">
        Participe do melhor bolão do Brasileirão!
      </h2>
      <p className="text-lg text-gray-300 max-w-2xl">
        Crie grupos, faça palpites nos jogos do Campeonato Brasileiro e veja
        quem entende mais de futebol!
      </p>

      <Link
        to="/login"
        className="mt-6 bg-yellow-400 px-6 py-3 rounded-lg text-gray-900 font-semibold hover:bg-yellow-500"
      >
        Começar agora
      </Link>
    </section>
  );
};

export default Hero;
