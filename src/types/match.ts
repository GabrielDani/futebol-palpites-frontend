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

export type MatchFormData = {
  homeTeam?: string;
  awayTeam?: string;
  scoreHome?: number;
  scoreAway?: number;
  date?: string;
  round: number;
};

export type MatchFormDataSubmit = {
  matchId?: string;
  homeTeamId?: number;
  awayTeamId?: number;
  scoreHome?: number;
  scoreAway?: number;
  date?: string;
  round?: number;
};
