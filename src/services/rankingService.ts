import { RankingEntry } from "../types/group";
import { api } from "./api";

export const RankingService = {
  getRanking: async (): Promise<RankingEntry[]> => {
    const { data } = await api.get("/ranking");
    return data;
  },
  getPerformance: async (): Promise<RankingEntry> => {
    const { data } = await api.get("/ranking/performance");
    return data;
  },
};
