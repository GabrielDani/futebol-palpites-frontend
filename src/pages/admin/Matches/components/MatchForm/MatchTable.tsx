import { Pencil, Trash2 } from "lucide-react";
import { Match } from "../../../../../types/match";
import { formatMatchDate } from "../../../../../utils/dateUtils";
import { Table } from "../../../../../components/ui/Table";

type MatchTableProps = {
  matches: Match[];
  isLoading?: boolean;
  onEdit: (match: Match) => void;
  onDelete: (id: string) => void;
};

export const MatchTable = ({
  matches,
  onEdit,
  onDelete,
  isLoading = false,
}: MatchTableProps) => {
  return !isLoading ? (
    <Table<Match>
      data={matches}
      columns={[
        {
          id: "date",
          header: "Data/Hora",
          cell: (match) => formatMatchDate(match.date),
          className: "p-2",
        },
        {
          id: "homeTeam",
          header: "Mandante",
          cell: (match) => match.homeTeam.name,
          className: "p-2 text-start",
        },
        {
          id: "score",
          header: "Placar",
          cell: (match) =>
            match.scoreHome !== null && match.scoreAway !== null
              ? `${match.scoreHome} x ${match.scoreAway}`
              : "-",
          className: "p-2 text-center",
        },
        {
          id: "awayTeam",
          header: "Visitante",
          cell: (match) => match.awayTeam.name,
          className: "p-2 text-start",
        },
        {
          id: "status",
          header: "Status",
          cell: (match) => <span className="capitalize">{match.status}</span>,
          className: "p-2",
        },
      ]}
      actions={[
        {
          icon: Pencil,
          onClick: onEdit,
          variant: "outline",
          className: "rounded-full",
        },
        {
          icon: Trash2,
          onClick: (match) => onDelete(match.id),
          variant: "destructive",
          className: "rounded-full",
        },
      ]}
      cardProps={{
        variant: "dark",
        padding: "sm",
      }}
      rowClassName="border-b border-gray-600 hover:bg-gray-600/30"
    />
  ) : (
    <>Loading</>
  );
};
