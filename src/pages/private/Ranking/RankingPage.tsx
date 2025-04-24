import { ErrorAlert } from "../../../components/common/ErrorAlert";
import { LoadingSpinner } from "../../../components/common/LoadingSpinner";
import { PageLayout } from "../../../components/layout/PageLayout";
import { useRanking } from "../../../hooks/useRanking";
import { RankingTable } from "./components/RankingTable";
import { UserPerformanceCard } from "./components/UserPerformanceCard";

export const RankingPage = () => {
  const { ranking, userPerformance, userPosition, loading, error, refresh } =
    useRanking();

  if (loading)
    return (
      <PageLayout>
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      </PageLayout>
    );

  if (error)
    return (
      <PageLayout>
        <div className="py-12 px-4">
          <ErrorAlert message={error} onRetry={refresh} />
        </div>
      </PageLayout>
    );

  return (
    <PageLayout>
      <div className="space-y-6">
        {/* Seção do desempenho do usuário */}
        {userPerformance && (
          <UserPerformanceCard
            performance={userPerformance}
            position={userPosition}
          />
        )}

        {/* Tabela de ranking geral */}
        <RankingTable ranking={ranking} />
      </div>
    </PageLayout>
  );
};
