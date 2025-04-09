type MatchStatusBadgeProps = {
  status: string;
};

export const MatchStatusBadge = ({ status }: MatchStatusBadgeProps) => {
  const getStatusConfig = () => {
    switch (status) {
      case "FINISHED":
        return {
          text: "FINALIZADO",
          classes: "bg-red-900/20 text-red-400",
        };
      case "ONGOING":
        return {
          text: "EM ANDAMENTO",
          classes: "bg-yellow-500/20 text-yellow-400",
        };
      default:
        return {
          text: "PENDENTE",
          classes: "bg-green-900/20 text-green-400",
        };
    }
  };

  const { text, classes } = getStatusConfig();

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${classes}`}>
      {text}
    </span>
  );
};
