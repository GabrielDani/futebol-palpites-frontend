import { useEffect, useState, useCallback } from "react";
import { RankingEntry } from "../types/group";
import { handleApiError } from "../utils/handleApiError";
import { RankingService } from "../services/rankingService";

export const useRanking = () => {
  const [ranking, setRanking] = useState<RankingEntry[]>([]);
  const [userPerformance, setUserPerformance] = useState<RankingEntry | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Wrap em useCallback para evitar recriações desnecessárias
  const fetchRanking = useCallback(async () => {
    try {
      setError(null);
      const data = await RankingService.getRanking();
      setRanking(data);
      return data;
    } catch (e) {
      const errorMessage = handleApiError(e);
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  const fetchUserPerformance = useCallback(async () => {
    try {
      setError(null);
      const data = await RankingService.getPerformance();
      setUserPerformance(data);
      return data;
    } catch (e) {
      const errorMessage = handleApiError(e);
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  // Função de refresh exposta também pode ser memorizada
  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      const results = await Promise.all([
        fetchRanking(),
        fetchUserPerformance(),
      ]);
      return results;
    } catch (e) {
      console.error("Failed to refresh ranking data:", e);
      throw e;
    } finally {
      setLoading(false);
    }
  }, [fetchRanking, fetchUserPerformance]);

  useEffect(() => {
    refresh(); // Reutiliza a função refresh no mount
  }, [refresh]);

  const getUserCurrentPosition = useCallback(() => {
    if (!userPerformance) return null;
    return (
      ranking.findIndex((entry) => entry.user.id === userPerformance.user.id) +
      1
    );
  }, [ranking, userPerformance]);

  return {
    ranking,
    userPerformance,
    userPosition: getUserCurrentPosition(),
    loading,
    error,
    refresh,
  };
};
