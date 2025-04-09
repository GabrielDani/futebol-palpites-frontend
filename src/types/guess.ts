import { Match } from "./match";

export type Guess = {
  scoreHome?: number;
  scoreAway?: number;
};

export type MatchPrediction = {
  match: Match;
  guess?: Guess;
};
