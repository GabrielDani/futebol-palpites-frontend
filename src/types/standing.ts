export type TeamStanding = {
  position: number;
  team: {
    id: string;
    name: string;
    logoUrl: string;
  };
  points: number;
  matches: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
};
