import { Match } from "../../types/match"; // Novo componente extraído
import { MatchStatusBadge } from "./MatchStatusBadge";
import { TeamLogo } from "./TeamLogo";

type MatchCardProps = {
  match: Match;
  variant?: "default" | "compact" | "detailed";
  onClick?: () => void;
  className?: string;
};

const formatMatchDate = (dateString?: string) => {
  if (!dateString) return "Data não definida";

  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const MatchCard = ({
  match,
  variant = "default",
  onClick,
  className = "",
}: MatchCardProps) => {
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
      className={`border border-gray-700 rounded-xl shadow-gray-700 shadow-lg hover:shadow-lg transition-all duration-300 bg-gray-800 text-gray-100 ${
        onClick ? "hover:cursor-pointer hover:border-yellow-400" : ""
      } ${getVariantClasses()} ${className}
    transform hover:scale-102`}
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <div className="text-sm text-gray-400">Rodada {match.round}</div>
          <div className="font-bold text-yellow-400">
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
            homeScore={isFinished ? match.scoreHome : undefined}
            awayScore={isFinished ? match.scoreAway : undefined}
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
                Início às{" "}
                {new Date(match.date).toLocaleTimeString("pt-BR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
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

// Componentes auxiliares
type TeamInfoProps = {
  team: {
    name: string;
    shortName: string;
    logoUrl?: string;
  };
  score?: number;
  position: "home" | "away";
  variant?: "default" | "compact" | "detailed";
};

const TeamInfo = ({ team, position, variant }: TeamInfoProps) => (
  <div
    className={`flex flex-col items-center ${
      position === "home" ? "order-first" : "order-last"
    }`}
  >
    <TeamLogo
      logoUrl={team.logoUrl}
      name={team.name}
      size={variant === "compact" ? "sm" : "md"}
    />
    <span
      className={`font-medium text-center text-gray-100 ${
        variant === "compact" ? "text-sm" : ""
      }`}
    >
      {variant === "compact" ? team.shortName : team.name}
    </span>
  </div>
);

type MatchScoreProps = {
  homeScore?: number;
  awayScore?: number;
  status: string;
  variant?: "default" | "compact" | "detailed";
};

const MatchScore = ({
  homeScore,
  awayScore,
  status,
  variant,
}: MatchScoreProps) => (
  <div className="flex flex-col items-center">
    <div
      className={`font-bold my-2 text-yellow-400 ${
        variant === "compact" ? "text-xl" : "text-2xl"
      }`}
    >
      {status === "FINISHED" ? (
        <>
          <span>{homeScore ?? "-"}</span>
          <span className="mx-1">x</span>
          <span>{awayScore ?? "-"}</span>
        </>
      ) : (
        <span className="text-gray-400">vs</span>
      )}
    </div>
    {variant !== "compact" && (
      <span className="text-xs text-gray-400">
        {status === "FINISHED" ? "Placar Final" : "Confronto"}
      </span>
    )}
  </div>
);
