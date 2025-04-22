// components/ui/TeamSelect.tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../../components/ui/Select";
import { Team } from "../../../../../types/match";

interface Props {
  teams: Team[];
  value: number;
  onChange: (value: number) => void;
  label: string;
  placeholder?: string;
  className?: string;
}

export const TeamSelect = ({
  teams,
  value,
  onChange,
  label,
  placeholder = "Selecione",
  className = "",
}: Props) => {
  const selectedTeam = teams.find((team) => team.id === value);

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <Select
        value={value.toString()}
        onValueChange={(val) => onChange(Number(val))}
      >
        <SelectTrigger>
          <SelectValue placeholder={placeholder}>
            {selectedTeam?.name}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {teams.map((team) => (
            <SelectItem key={team.id} value={team.id.toString()}>
              {team.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
