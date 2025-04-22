import { Match } from "./match";

export type Guess = {
  scoreHome?: number;
  scoreAway?: number;
};

export type MatchPrediction = {
  match: Match;
  guess?: Guess;
};

export type MatchPredictionSubmit = {
  matchId: string;
  scoreHome: number;
  scoreAway: number;
};
