import { Group } from "../../../../types/group";
import { GroupCard } from "./GroupCard";

interface Props {
  groups: Group[];
  onGroupClick: (groupId: string) => void;
}

export const UserGroupSection = ({ groups, onGroupClick }: Props) => (
  <div className="space-y-4">
    <h2 className="text-start text-xl font-semibold text-gray-100">
      Meus Grupos
    </h2>
    {groups.length === 0 ? (
      <p className="text-gray-400">Você não está em nenhum grupo ainda</p>
    ) : (
      <div className="grid grid-cols-1 gap-4">
        {groups.map((group) => (
          <GroupCard
            key={group.id}
            group={group}
            isMember={true}
            onCardClick={() => onGroupClick(group.id)}
          />
        ))}
      </div>
    )}
  </div>
);
