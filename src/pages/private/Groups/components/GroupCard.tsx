// components/groups/GroupCard.tsx
import { Button } from "../../../../components/ui/Button";
import { Group } from "../../../../types/group";
import { Lock, Users } from "lucide-react";

interface GroupCardProps {
  group: Group;
  isMember: boolean;
  onCardClick?: () => void;
  onButtonClick?: () => void;
}

export const GroupCard = ({
  group,
  isMember,
  onCardClick,
  onButtonClick,
}: GroupCardProps) => {
  return (
    <div
      className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-yellow-500 transition-colors cursor-pointer"
      onClick={onCardClick}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold text-yellow-400">{group.name}</h3>
          <p className="text-start text-gray-400 text-sm">
            {group.createdBy.nickname}
          </p>
        </div>
        {!group.isPublic && <Lock className="text-gray-400" size={18} />}
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div className="flex items-center text-gray-400 text-sm">
          <Users className="mr-1" size={16} />
          {group.memberCount} membros
        </div>

        <Button
          onClick={onButtonClick}
          size="sm"
          variant={isMember ? "ghost" : "default"}
          disabled={isMember}
        >
          {isMember ? "Participando" : "Entrar"}
        </Button>
      </div>
    </div>
  );
};
