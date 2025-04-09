import { Match } from "../../../types/match";
import { MatchPrediction } from "../../../types/guess";
import { MatchStatusBadge } from "./components/MatchStatusBadge";
import { TeamInfo } from "../team/TeamInfo";
import { MatchScore } from "./components/MatchScore";
import { formatHourMatchDate, formatMatchDate } from "../../../utils/dateUtils";

function isMatchPrediction(
  data: Match | MatchPrediction
): data is MatchPrediction {
  return (data as MatchPrediction).match !== undefined;
}

type MatchCardProps = {
  data: Match | MatchPrediction;
  variant?: "default" | "compact" | "detailed";
  onClick?: () => void;
  className?: string;
};

export const MatchCard = ({
  data,
  variant = "default",
  onClick,
  className = "",
}: MatchCardProps) => {
  const isPrediction = isMatchPrediction(data);
  const match = isPrediction ? data.match : data;

  const isFinished = match.status === "FINISHED";
  const isOngoing = match.status === "ONGOING";
  const isPending = match.status === "PENDING";

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

  return (
    <div
      className={`border border-gray-700 rounded-xl shadow-gray-700 shadow-lg 
        hover:shadow-lg transition-all duration-300 bg-gray-800 text-gray-100 
        ${onClick ? "hover:cursor-pointer hover:border-yellow-400" : ""}
        ${getVariantClasses()} ${className}
    transform hover:scale-102`}
      onClick={onClick}
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
          <MatchScore
            homeScore={isFinished || isOngoing ? match.scoreHome : undefined}
            awayScore={isFinished || isOngoing ? match.scoreAway : undefined}
            status={match.status}
            variant={variant}
          />

          <TeamInfo team={match.awayTeam} position="away" variant={variant} />
        </div>
      </div>

      {/* Footer */}
      {variant !== "compact" && (
        <div className="text-sm text-gray-400">
          {isFinished && <p className="text-center">Partida encerrada</p>}
          {isOngoing && <p className="text-center">Partida em andamento</p>}
          {isPending ? (
            match.date ? (
              <p className="text-center">
                Início às {formatHourMatchDate(match.date)}
              </p>
            ) : (
              <p className="text-center">Horário não definido</p>
            )
          ) : null}
        </div>
      )}
    </div>
  );
};
