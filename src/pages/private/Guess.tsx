import { useEffect, useState } from "react";
import { Section } from "../../components/ui/Section";
import { Button } from "../../components/ui/Button";
import { PageLayout } from "../../components/layout/PageLayout";
import { GuessGreatings } from "../../components/ui/guess/components/GuessGreatings";
import { RoundControls } from "../../components/ui/guess/components/RoundControls";
import { GuessService } from "../../services/guessService";
import { MatchPrediction } from "../../types/guess";
import { GuessCard } from "../../components/ui/guess/GuessCard";

export const Guess = () => {
  const [currentRound, setCurrentRound] = useState(1);
  const [matchesPrediction, setMatchesPrediction] = useState<MatchPrediction[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllMatchesPrediction = async () => {
      try {
        setLoading(true);
        const matchesPredictionData = await GuessService.findMyGuesses();
        setMatchesPrediction(matchesPredictionData);
      } catch (error) {
        console.log("[Guess][useEffect] Erro ao carregar partidas:", error);
      } finally {
        setLoading(false);
      }
    };

    getAllMatchesPrediction();
  }, []);

  const nextRound = () => {
    if (currentRound < 38) {
      const newRound = currentRound + 1;
      setCurrentRound(newRound);
    }
  };

  const prevRound = () => {
    if (currentRound > 1) {
      const newRound = currentRound - 1;
      setCurrentRound(newRound);
    }
  };

  const handlePredictionChange = (
    matchId: string,
    team: "home" | "away",
    value?: number
  ) => {
    setMatchesPrediction((prevPredictions) =>
      prevPredictions.map((prediction) => {
        if (prediction.match.id === matchId) {
          return {
            ...prediction,
            guess: {
              ...(prediction.guess || {
                scoreHome: undefined,
                scoreAway: undefined,
              }),
              [team === "home" ? "scoreHome" : "scoreAway"]: value,
            },
          };
        }
        return prediction;
      })
    );
  };

  const submitPredictions = () => {
    clearEmptyPredictions();
    console.log(
      "[Guess][submitPredictions] Palpites enviados:",
      matchesPrediction.filter((m) => m.guess)
    );
    // Aqui você implementaria a lógica para enviar ao backend
    alert("Palpites enviados com sucesso!");
  };

  const clearEmptyPredictions = () => {
    setMatchesPrediction((prevPredictions) =>
      prevPredictions.map((prediction) => {
        if (
          prediction.guess &&
          (!prediction.guess.scoreAway || !prediction.guess.scoreHome)
        ) {
          return {
            ...prediction,
            guess: undefined,
          };
        }
        return prediction;
      })
    );
  };

  return (
    <PageLayout>
      <Section
        bgColor="transparent"
        gridClass="grid grid-cols-1"
        spacing={{ padding: "py-8 px-4", gap: "gap-2" }}
      >
        <GuessGreatings />

        <Section
          gridClass="grid grid-cols-1"
          spacing={{ padding: "px-8 py-5", gap: "gap-1" }}
        >
          <RoundControls
            currentRound={currentRound}
            onNext={nextRound}
            onPrev={prevRound}
          />

          {loading ? (
            <div className="text-center py-12">
              <span className="text-yellow-400 animate-pulse">
                Carregando jogos...
              </span>
            </div>
          ) : (
            <Section gridClass="grid grid-cols-1 md:grid-cols-2">
              {matchesPrediction
                .filter((mp) => mp.match.round === currentRound)
                .map((mp) => (
                  <GuessCard
                    key={mp.match.id}
                    matchPrediction={mp}
                    onScoreChange={(team, value) =>
                      handlePredictionChange(mp.match.id, team, value)
                    }
                  />
                ))}
            </Section>
          )}
        </Section>

        <div className="flex justify-center">
          <Button
            onClick={submitPredictions}
            className="px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold"
          >
            Enviar Palpites
          </Button>
        </div>
      </Section>
    </PageLayout>
  );
};
