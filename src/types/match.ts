export type Team = {
  id: number;
  name: string;
  shortName: string;
  logoUrl?: string;
};

export type Match = {
  id: string;
  scoreHome?: number;
  scoreAway?: number;
  date?: string;
  status: string;
  round: number;
  homeTeam: Team;
  awayTeam: Team;
};
