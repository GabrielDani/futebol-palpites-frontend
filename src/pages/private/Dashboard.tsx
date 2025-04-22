import { useEffect, useState } from "react";
import { Match } from "../../types/match";
import { MatchService } from "../../services/matchService";
import { MatchesCarousel } from "../../components/ui/matches/MatchesCarousel";
import { PageLayout } from "../../components/layout/PageLayout";
import { Greetings } from "../../components/ui/dashboard/Greeting";
import { FeatureCard } from "../../components/common/FeatureCard";
import { Section } from "../../components/ui/Section";
import { Clock10 } from "lucide-react";
import { MatchCard } from "../../components/ui/matches/MatchCard";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    MatchService.nextMatches(10)
      .then((matches) => {
        setMatches(matches);
        console.log("[Dashboard] Matches: ", matches);
      })
      .catch((error) => {
        console.error("[Dashboard] Error: ", error);
        alert(error);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <PageLayout>
      <Greetings />

      <MatchesCarousel
        items={matches}
        loading={loading}
        title="Próximos Jogos"
        titleIcon={<Clock10 className="text-yellow-400" size={22} />}
        renderItem={(match) => <MatchCard data={match} />}
        carouselSettings={{
          slidesToShow: 3,
          responsive: [
            {
              breakpoint: 1024,
              settings: { slidesToShow: 2 },
            },
            {
              breakpoint: 768,
              settings: { slidesToShow: 1 },
            },
          ],
        }}
      />
      <Section
        bgColor="transparent"
        spacing={{ padding: "py-16 px-8", gap: "gap-4" }}
        gridClass="grid grid-cols-1 md:grid-cols-3"
      >
        <FeatureCard
          title="Palpites"
          description="Dê seus palpites nos jogos e acompanhe os resultados em tempo real."
          onClick={() => navigate("/palpites")}
        />
        <FeatureCard
          title="Criar ou Entrar em Grupo"
          description="Participe de grupos com seus amigos e dispute quem acerta mais palpites!"
          onClick={() => navigate("/grupos")}
        />
        <FeatureCard
          title="Ver Ranking"
          description="Acompanhe sua pontuação e veja quem está no topo do ranking."
          onClick={() => navigate("/ranking")}
        />
      </Section>
    </PageLayout>
  );
};
