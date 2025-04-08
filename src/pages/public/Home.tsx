import Footer from "../../components/footer/Footer";
import { Header } from "../../components/layout/Header";
import { Hero } from "../../components/hero/Hero";
import { FeatureCard } from "../../components/ui/FeatureCard";
import { Section } from "../../components/ui/Section";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Header />
      <Hero />
      <Section>
        <FeatureCard
          title="Criação de Grupos"
          description="Monte seu grupo e convide amigos para participar."
          highlightColor="text-gray-300"
        />
        <FeatureCard
          title="Palpite nos Jogos"
          description="Dê seus palpites e acompanhe os resultados ao vivo."
          highlightColor="text-gray-300"
        />
        <FeatureCard
          title="Ranking Competitivo"
          description="Veja quem lidera e desafie seus amigos."
          highlightColor="text-gray-300"
        />
      </Section>
      <Footer />
    </div>
  );
};

export default Home;
