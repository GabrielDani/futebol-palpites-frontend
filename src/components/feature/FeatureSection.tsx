const FeaturesSection = () => {
  return (
    <section className="py-16 px-8 bg-gray-800 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
      <FeatureCard
        title="Criação de Grupos"
        description="Monte seu grupo e convide amigos para participar."
      />
      <FeatureCard
        title="Palpite nos Jogos"
        description="Dê seus palpites e acompanhe os resultados ao vivo."
      />
      <FeatureCard
        title="Ranking Competitivo"
        description="Veja quem lidera e desafie seus amigos."
      />
    </section>
  );
};

const FeatureCard = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="p-6 bg-gray-700 rounded-lg">
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

export default FeaturesSection;
