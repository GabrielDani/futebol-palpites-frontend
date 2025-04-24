import { Trophy, Medal } from "lucide-react";
import { RankingEntry } from "../../../../types/group";
import { Table } from "../../../../components/ui/Table";

export const RankingTable = ({ ranking }: { ranking: RankingEntry[] }) => {
  const columns = [
    {
      id: "position",
      header: "Posição",
      cell: (row: RankingEntry) => (
        <div className="flex items-center gap-2">
          {row.position === 1 ? (
            <Trophy className="h-5 w-5 text-yellow-400" />
          ) : row.position <= 3 ? (
            <Medal className="h-5 w-5 text-gray-400" />
          ) : (
            <span className="w-5 text-center">{row.position}</span>
          )}
        </div>
      ),
      align: "center" as const,
    },
    {
      id: "nickname",
      header: "Nome",
      cell: (row: RankingEntry) => (
        <div className="flex items-center gap-3">
          <div className="bg-gray-700 rounded-full h-8 w-8 flex items-center justify-center text-sm">
            {row.position}
          </div>
          <span>{row.user.nickname}</span>
        </div>
      ),
    },
    {
      id: "points",
      header: "Pontos",
      cell: (row: RankingEntry) => (
        <span className="font-bold text-yellow-400">{row.points}</span>
      ),
      align: "center" as const,
    },
    {
      id: "exactHits",
      header: "Exatos",
      cell: (row: RankingEntry) => row.exactHits,
      align: "center" as const,
    },
    {
      id: "correctPredictions",
      header: "Acertos",
      cell: (row: RankingEntry) => row.correctPredictions,
      align: "center" as const,
    },
  ];

  return (
    <Table
      data={ranking}
      columns={columns}
      cardProps={{
        className: "bg-gray-800 border-0 shadow-none",
      }}
      rowClassName={(row) =>
        row.position === 1
          ? "bg-yellow-500/10"
          : row.position === 2
          ? "bg-gray-400/10"
          : row.position === 3
          ? "bg-amber-700/10"
          : ""
      }
    />
  );
};
