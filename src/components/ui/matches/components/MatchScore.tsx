type MatchScoreProps = {
  homeScore?: number;
  awayScore?: number;
  status: string;
  variant?: "default" | "compact" | "detailed";
  footerDetail?: string;
};

export const MatchScore = ({
  homeScore,
  awayScore,
  status,
  variant,
  footerDetail,
}: MatchScoreProps) => (
  <div className="flex flex-col items-center">
    <div
      className={`font-bold my-2 text-yellow-400 ${
        variant === "compact" ? "text-xl" : "text-2xl"
      }`}
    >
      {status === "FINISHED" || status === "ONGOING" ? (
        <>
          <span>{homeScore ?? "-"}</span>
          <span className="mx-1">vs</span>
          <span>{awayScore ?? "-"}</span>
        </>
      ) : (
        <span className="text-gray-400">vs</span>
      )}
    </div>
    {variant !== "compact" && (
      <span className="text-xs text-gray-400">
        {footerDetail ??
          (status === "FINISHED"
            ? "Placar Final"
            : status === "ONGOING"
            ? "Ao vivo"
            : "Confronto")}
      </span>
    )}
  </div>
);
