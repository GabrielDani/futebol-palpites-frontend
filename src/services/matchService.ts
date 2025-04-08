import { Match } from "../types/match";
import { api } from "./api";

export const MatchService = {
  allMatches: async (): Promise<Match[]> => {
    console.log("[MatchService] Buscando todas as partidas...");
    const { data } = await api.get("matches");
    console.log("[MatchService] Partidas encontradas: ", data);
    return data;
  },
  nextMatches: async (quantity: number): Promise<Match[]> => {
    console.log("[MatchService] Buscando próximas partidas...");
    const { data } = await api.get(`matches/nextmatches/${quantity}`);
    console.log("[MatchService] Partidas encontradas: ", data);
    return data;
  },
};
