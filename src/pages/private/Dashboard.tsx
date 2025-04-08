import { useEffect, useState } from "react";
import { Match } from "../../types/match";
import { MatchService } from "../../services/matchService";
import { MatchesCarousel } from "../../components/matches/MatchesCarousel";
import { PageLayout } from "../../components/layout/PageLayout";
import { Greetings } from "../../components/ui/Greeting";
import { FeatureCard } from "../../components/ui/FeatureCard";
import { Section } from "../../components/ui/Section";
import { Clock10 } from "lucide-react";
import { MatchCard } from "../../components/matches/MatchCard";

export const Dashboard = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    MatchService.nextMatches(10)
      // MatchService.allMatches()
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
      <main className="flex-1 px-6 py-10 max-w-7xl mx-auto w-full">
        <Greetings />
        <MatchesCarousel
          items={matches}
          loading={loading}
          title="Próximos Jogos"
          titleIcon={<Clock10 className="text-yellow-400" size={22} />}
          renderItem={(match) => <MatchCard match={match} />}
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
          gridCols={{ default: "grid-cols-1", md: "grid-cols-2" }}
        >
          <FeatureCard
            title="Criar ou Entrar em Grupo"
            description="Participe de grupos com seus amigos e dispute quem acerta mais palpites!"
          />
          <FeatureCard
            title="Ver Ranking"
            description="Acompanhe sua pontuação e veja quem está no topo do ranking."
          />
        </Section>
      </main>
    </PageLayout>
  );
};
