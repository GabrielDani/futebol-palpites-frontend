import { Hero } from "../../components/ui/home/Hero";
import { FeatureCard } from "../../components/common/FeatureCard";
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
          highlight="gray"
        />
        <FeatureCard
          title="Palpite nos Jogos"
          description="Dê seus palpites e acompanhe os resultados ao vivo."
          highlight="gray"
        />
        <FeatureCard
          title="Ranking Competitivo"
          description="Veja quem lidera e desafie seus amigos."
          highlight="gray"
        />
      </Section>

      <Footer />
    </PageLayout>
  );
};
