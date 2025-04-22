// src/hooks/useGuess.ts
import { useEffect, useState } from "react";
import { GuessService } from "../services/guessService";
import { MatchPrediction, MatchPredictionSubmit } from "../types/guess";
import { TeamStanding } from "../types/standing";
import { MatchService } from "../services/matchService";

export const useGuess = () => {
  const [originalPredictions, setOriginalPredictions] = useState<
    MatchPrediction[]
  >([]);
  const [matchesPrediction, setMatchesPrediction] = useState<MatchPrediction[]>(
    []
  );
  const [currentRound, setCurrentRound] = useState(1);
  const [loading, setLoading] = useState(true);
  const [standings, setStandings] = useState<TeamStanding[]>([]);
  const [submissionLoading, setSubmissionLoading] = useState(false);

  // Carrega dados iniciais
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [predictions, standingsData] = await Promise.all([
          GuessService.findMyGuesses(),
          MatchService.getStandings(),
        ]);
        setMatchesPrediction(predictions);
        setOriginalPredictions(predictions); // Armazena os palpites originais
        setStandings(standingsData);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Navegação entre rodadas
  const nextRound = () =>
    currentRound < 38 && setCurrentRound(currentRound + 1);
  const prevRound = () => currentRound > 1 && setCurrentRound(currentRound - 1);

  // Manipulação de palpites
  const handlePredictionChange = (
    matchId: string,
    team: "home" | "away",
    value?: number
  ) => {
    setMatchesPrediction((prev) =>
      prev.map((prediction) =>
        prediction.match.id === matchId
          ? {
              ...prediction,
              guess: {
                ...(prediction.guess || {
                  scoreHome: undefined,
                  scoreAway: undefined,
                }),
                [team === "home" ? "scoreHome" : "scoreAway"]: value,
              },
            }
          : prediction
      )
    );
  };

  const getChangedPredictions = (): MatchPredictionSubmit[] => {
    return matchesPrediction
      .filter((matchPred) => {
        const original = originalPredictions.find(
          (op) => op.match.id === matchPred.match.id
        );

        // Se não existia antes e foi preenchido agora
        if (!original?.guess && matchPred.guess) {
          return true;
        }

        // Se existia antes e foi modificado
        if (original?.guess && matchPred.guess) {
          return (
            original.guess.scoreHome !== matchPred.guess.scoreHome ||
            original.guess.scoreAway !== matchPred.guess.scoreAway
          );
        }

        return false;
      })
      .map((matchPred) => ({
        matchId: matchPred.match.id,
        scoreHome: matchPred.guess!.scoreHome!,
        scoreAway: matchPred.guess!.scoreAway!,
      }));
  };

  // Submissão de palpites
  const submitPredictions = async () => {
    try {
      setSubmissionLoading(true);

      const predictionsToSubmit = getChangedPredictions();

      if (predictionsToSubmit.length === 0) {
        alert("Nenhum palpite modificado para enviar!");
        return;
      }

      await GuessService.submitPredictions(predictionsToSubmit);

      // Atualiza os palpites originais com os novos valores
      setOriginalPredictions((prev) =>
        prev.map((p) => {
          const updated = matchesPrediction.find(
            (mp) => mp.match.id === p.match.id
          );
          return updated || p;
        })
      );

      alert("Palpites enviados com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar palpites:", error);
      alert("Erro ao enviar palpites");
    } finally {
      setSubmissionLoading(false);
    }
  };

  return {
    currentRound,
    matchesPrediction,
    loading,
    standings,
    submissionLoading,
    nextRound,
    prevRound,
    handlePredictionChange,
    submitPredictions,
  };
};
