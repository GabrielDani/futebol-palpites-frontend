import { MatchPrediction } from "../../../types/guess";
import { formatMatchDate } from "../../../utils/dateUtils";
import { MatchScore } from "../matches/components/MatchScore";
import { MatchStatusBadge } from "../matches/components/MatchStatusBadge";
import { TeamInfo } from "../team/TeamInfo";
import { PredictionInputs } from "./components/PredictionInputs";

type GuessCardProps = {
  matchPrediction: MatchPrediction;
  showUserPrediction: boolean;
  variant?: "default" | "compact" | "detailed";
  onScoreChange?: (
    matchId: string,
    team: "home" | "away",
    value?: number
  ) => void;
  className?: string;
};

export const GuessCard = ({
  matchPrediction,
  showUserPrediction,
  variant = "default",
  onScoreChange,
  className = "",
}: GuessCardProps) => {
  const match = matchPrediction.match;
  const guess = matchPrediction.guess;

  const isPending = matchPrediction.match.status === "PENDING";

  const getVariantClasses = () => {
    switch (variant) {
      case "compact":
        return "p-4";
      case "detailed":
        return "p-6";
      default:
        return "p-5";
    }
  };

  const handleScoreChange = (team: "home" | "away", value?: number) => {
    if (onScoreChange) {
      onScoreChange(match.id, team, value);
    }
  };

  return (
    <div
      className={`border border-gray-700 rounded-xl shadow-gray-700 shadow-lg 
        hover:shadow-lg transition-all duration-300 bg-gray-800 text-gray-100 
        ${getVariantClasses()} ${className}
        transform hover:scale-102`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <div className="text-sm text-gray-400 text-start">
            Rodada {match.round}
          </div>
          <div className="font-bold text-yellow-400 text-start">
            {formatMatchDate(match.date)}
          </div>
        </div>
        <MatchStatusBadge status={match.status} />
      </div>

      {/* Scoreboard */}
      <div
        className={`bg-gray-700/50 rounded-lg mb-4 ${
          variant === "compact" ? "p-2" : "p-4"
        }`}
      >
        <div className="flex justify-center items-center gap-4">
          <TeamInfo team={match.homeTeam} position="home" variant={variant} />
          {showUserPrediction ? (
            isPending ? (
              <PredictionInputs
                homeScore={guess?.scoreHome}
                awayScore={guess?.scoreAway}
                onScoreChange={handleScoreChange}
              />
            ) : (
              <MatchScore
                homeScore={guess?.scoreHome}
                awayScore={guess?.scoreAway}
                status={match.status}
                footerDetail="Seu Palpite"
              />
            )
          ) : (
            <MatchScore
              homeScore={match.scoreHome}
              awayScore={match.scoreAway}
              status={match.status}
              footerDetail="Placar Real"
            />
          )}

          <TeamInfo team={match.awayTeam} position="away" variant={variant} />
        </div>
      </div>

      {variant !== "compact" && match.date && (
        <div className="text-sm text-gray-400 text-center">
          Início às{" "}
          {new Date(match.date).toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      )}
    </div>
  );
};
