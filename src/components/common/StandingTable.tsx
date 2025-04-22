// components/ui/guess/StandingsTable.tsx
import { TeamStanding } from "../../types/standing";
import { Table } from "../ui/Table";

interface StandingsTableProps {
  standings: TeamStanding[];
  isLoading?: boolean;
}

export const StandingsTable = ({
  standings,
  isLoading = false,
}: StandingsTableProps) => {
  const columns = [
    {
      id: "position",
      header: "Posição",
      cell: (team: TeamStanding) => team.position,
      align: "center" as const,
      className: "w-16",
    },
    {
      id: "team",
      header: "Time",
      cell: (team: TeamStanding) => (
        <div className="flex items-center gap-2">
          <img
            src={team.team.logoUrl}
            alt={team.team.name}
            className="w-6 h-6 object-contain"
          />
          <span>{team.team.name}</span>
        </div>
      ),
      className: "min-w-[180px]",
    },
    {
      id: "points",
      header: "PTS",
      cell: (team: TeamStanding) => (
        <span className="font-bold">{team.points}</span>
      ),
      align: "center" as const,
      className: "w-16",
    },
    {
      id: "matches",
      header: "J",
      cell: (team: TeamStanding) => team.matches,
      align: "center" as const,
      className: "w-12",
    },
    {
      id: "wins",
      header: "V",
      cell: (team: TeamStanding) => team.wins,
      align: "center" as const,
      className: "w-12",
    },
    {
      id: "draws",
      header: "E",
      cell: (team: TeamStanding) => team.draws,
      align: "center" as const,
      className: "w-12",
    },
    {
      id: "losses",
      header: "D",
      cell: (team: TeamStanding) => team.losses,
      align: "center" as const,
      className: "w-12",
    },
    {
      id: "goalsFor",
      header: "GP",
      cell: (team: TeamStanding) => team.goalsFor,
      align: "center" as const,
      className: "w-12",
    },
    {
      id: "goalsAgainst",
      header: "GC",
      cell: (team: TeamStanding) => team.goalsAgainst,
      align: "center" as const,
      className: "w-12",
    },
    {
      id: "goalDifference",
      header: "SG",
      cell: (team: TeamStanding) => team.goalDifference,
      align: "center" as const,
      className: "w-12",
    },
  ];

  return (
    <div className="mt-8 bg-gray-800 rounded-lg p-4">
      <h2 className="text-xl font-bold text-yellow-400 mb-4">Classificação</h2>

      <Table<TeamStanding>
        data={standings}
        columns={columns}
        isLoading={isLoading}
        emptyState={
          <div className="py-12 text-center text-gray-400">
            Nenhum time encontrado
          </div>
        }
        cardProps={{
          className: "bg-gray-800 border-gray-700",
        }}
        rowClassName="border-b border-gray-700 hover:bg-gray-700"
      />
    </div>
  );
};
