import { Match, MatchFormDataSubmit } from "../types/match";
import { TeamStanding } from "../types/standing";
import { api } from "./api";

export const MatchService = {
  getAll: async (): Promise<Match[]> => {
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
  getMatchesByRound: async (round: number): Promise<Match[]> => {
    console.log(`[MatchService] Buscando partidas do round ${round}...`);
    const { data } = await api.get(`matches/round/${round}`);
    console.log(`[MatchService] Partidas encontradas do round ${round}`, data);
    return data;
  },
  getStandings: async (): Promise<TeamStanding[]> => {
    console.log("[MatchService] Buscando tabela...");
    const { data } = await api.get("/matches/standings");
    console.log("[MatchService] Tabela", data);
    return data;
  },
  create: async (params: MatchFormDataSubmit): Promise<Match> => {
    console.log("[MatchService][create] Criando partida...", params);
    const { data } = await api.post("matches", params);
    console.log("[MatchService][create] Partida criada", data);
    return data;
  },
  update: async (id: string, params: MatchFormDataSubmit): Promise<Match> => {
    console.log(`[MatchService][update] Atualizando partida ${id}`, params);
    const { data } = await api.put(`matches/${id}`, params);
    console.log("[MatchService][update] Partida criada", data);
    return data;
  },
  delete: async (id: string) => {
    console.log(`[MatchService][delete] Deletando partida ${id}`);
    const { data } = await api.delete(`/matches/${id}`);
    console.log(`[MatchService][delete] Partida deletada ${id}`);
    return data;
  },
};
