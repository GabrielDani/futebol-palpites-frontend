import { MatchPrediction } from "../types/guess";
import { api } from "./api";

export const GuessService = {
  findMyGuesses: async (): Promise<MatchPrediction[]> => {
    console.log("[GuessService][findMyGuess] Buscando palpites...");
    const { data } = await api.get("/guesses/my");
    console.log("[GuessService][findMyGuess] Palpites encontrados:", data);
    return data;
  },
};
