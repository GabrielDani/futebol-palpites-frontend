import { cn } from "../../../../lib/utils";
import { Group } from "../../../../types/group";
import { GroupCard } from "./GroupCard";

interface Props {
  title: string;
  groups: Group[];
  isMember?: boolean;
  onCardClick?: (groupId: string) => void;
  onButtonClick?: (groupId: string) => void;
  className?: string;
  emptyState?: React.ReactNode;
  gridColumns?: 1 | 2 | 3 | 4;
}

export const GroupSection = ({
  title,
  groups,
  isMember = false,
  onCardClick,
  onButtonClick,
  className,
  emptyState = <p className="text-gray-400">Nenhum grupo disponível</p>,
  gridColumns = 1,
}: Props) => {
  const gridClass = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  }[gridColumns];

  return (
    <div className={cn("space-y-4", className)}>
      <h2 className="text-start text-xl font-semibold text-gray-100">
        {title}
      </h2>

      {groups.length === 0 ? (
        emptyState
      ) : (
        <div className={cn("grid gap-4", gridClass)}>
          {groups.map((group) => (
            <GroupCard
              key={group.id}
              group={group}
              isMember={isMember}
              onCardClick={() => onCardClick?.(group.id)}
              onButtonClick={() => onButtonClick?.(group.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
