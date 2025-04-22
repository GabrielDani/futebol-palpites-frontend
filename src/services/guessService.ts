import { MatchPrediction, MatchPredictionSubmit } from "../types/guess";
import { api } from "./api";

export const GuessService = {
  findMyGuesses: async (): Promise<MatchPrediction[]> => {
    console.log("[GuessService][findMyGuess] Buscando palpites...");
    const { data } = await api.get("/guesses/my");
    console.log("[GuessService][findMyGuess] Palpites encontrados:", data);
    return data;
  },
  submitPredictions: async (params: MatchPredictionSubmit[]): Promise<void> => {
    console.log(
      "[GuessService][submitPredictions] Enviando palpites...",
      params
    );
    const { data } = await api.post("/guesses", params);
    console.log("[GuessService][submitPredictions]", data);
    return data;
  },
};
