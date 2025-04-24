import { Table } from "../../../../components/ui/Table";
import { cn } from "../../../../lib/utils";
import { RankingEntry } from "../../../../types/group";

interface Props {
  ranking: RankingEntry[];
}

export const RankingTable = ({ ranking }: Props) => {
  const columns = [
    {
      id: "position",
      header: "Posição",
      cell: (row: RankingEntry) => (
        <span className="font-medium">{row.position}</span>
      ),
      align: "center" as const,
    },
    {
      id: "nickname",
      header: "Nome",
      cell: (row: RankingEntry) => (
        <div className="flex items-center gap-2">
          <span>{row.user.nickname}</span>
        </div>
      ),
    },
    {
      id: "points",
      header: "Pontos",
      cell: (row: RankingEntry) => (
        <span className="font-bold">{row.points}</span>
      ),
      align: "center" as const,
    },
    {
      id: "correctPredictions",
      header: "Acertos",
      cell: (row: RankingEntry) => row.correctPredictions,
      align: "center" as const,
    },
    {
      id: "exactHits",
      header: "Exatos",
      cell: (row: RankingEntry) => row.exactHits,
      align: "center" as const,
    },
    {
      id: "totalPredictions",
      header: "Palpites",
      cell: (row: RankingEntry) => row.totalGuesses,
      align: "center" as const,
    },
  ];

  const rowClassName = (row: RankingEntry) => {
    return cn(
      "text-gray-100 hover:bg-gray-700/50",
      row.position <= 3 && "bg-opacity-20",
      row.position === 1 && "bg-yellow-500",
      row.position === 2 && "bg-gray-500",
      row.position === 3 && "bg-amber-700"
    );
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-100 mb-4">Ranking</h2>
      <Table
        data={ranking}
        columns={columns}
        rowClassName={rowClassName}
        cardProps={{
          className: "bg-gray-800 border-0 shadow-none",
        }}
        emptyState={
          <div className="py-12 text-center text-gray-400">
            Nenhum dado disponível
          </div>
        }
      />
    </div>
  );
};
