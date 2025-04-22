import { Team } from "../types/match";
import { api } from "./api";

export const TeamService = {
  getAll: async (): Promise<Team[]> => {
    console.log("[TeamService][getAll] Buscando times...");
    const { data } = await api.get("/teams");
    console.log("[TeamService][getAll] Times encontrados:", data);
    return data;
  },
};
