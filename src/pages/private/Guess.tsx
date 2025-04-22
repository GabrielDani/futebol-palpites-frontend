// pages/Guess.tsx
import { Section } from "../../components/ui/Section";
import { PageLayout } from "../../components/layout/PageLayout";
import { GuessGreatings } from "../../components/ui/guess/components/GuessGreatings";
import { RoundControls } from "../../components/ui/guess/components/RoundControls";
import { GuessCard } from "../../components/ui/guess/GuessCard";
import { Button } from "../../components/ui/Button";
import { useGuess } from "../../hooks/useGuess";
import { StandingsTable } from "../../components/common/StandingTable";
import { useState } from "react";
import { Switch } from "../../components/ui/Switch";

export const Guess = () => {
  const {
    currentRound,
    matchesPrediction,
    loading,
    standings,
    nextRound,
    prevRound,
    handlePredictionChange,
    submitPredictions,
  } = useGuess();

  const [showUserPredictions, setShowUserPredictions] = useState(true);

  const currentRoundMatches = matchesPrediction.filter(
    (mp) => mp.match.round === currentRound
  );

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

          <div className="flex flex-col mt-4 items-end">
            <Switch
              checked={showUserPredictions}
              onChange={() => setShowUserPredictions(!showUserPredictions)}
              labelChecked="Palpites"
              labelUnchecked="Placares"
            />
          </div>

          {loading ? (
            <>Carregando jogos...</>
          ) : (
            <>
              <Section gridClass="grid grid-cols-1 md:grid-cols-2">
                {currentRoundMatches.map((mp) => (
                  <GuessCard
                    key={mp.match.id}
                    matchPrediction={mp}
                    showUserPrediction={showUserPredictions}
                    onScoreChange={handlePredictionChange}
                  />
                ))}
              </Section>

              <div className="flex justify-center">
                <Button onClick={submitPredictions} variant="create" size="lg">
                  Enviar Palpites
                </Button>
              </div>
            </>
          )}
        </Section>
        <StandingsTable standings={standings} />
      </Section>
    </PageLayout>
  );
};
