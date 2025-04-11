import { Hero } from "../../components/ui/home/Hero";
import { FeatureCard } from "../../components/ui/FeatureCard";
import { Section } from "../../components/ui/Section";
import { Footer } from "../../components/ui/home/Footer";
import { PageLayout } from "../../components/layout/PageLayout";

export const Home = () => {
  return (
    <PageLayout>
      <Hero />
      <Section gridClass="grid grid-cols-1 md:grid-cols-3">
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
    </PageLayout>
  );
};
