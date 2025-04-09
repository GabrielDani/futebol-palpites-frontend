import { TeamLogo } from "./TeamLogo";

type TeamInfoProps = {
  team: {
    name: string;
    shortName: string;
    logoUrl?: string;
  };
  position: "home" | "away";
  variant?: "default" | "compact" | "detailed";
};

export const TeamInfo = ({ team, position, variant }: TeamInfoProps) => (
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
