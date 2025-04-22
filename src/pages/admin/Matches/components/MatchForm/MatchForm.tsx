import { useState, useEffect } from "react";
import { MatchFormDataSubmit, Team } from "../../../../../types/match";
import { MatchService } from "../../../../../services/matchService";
import { handleApiError } from "../../../../../utils/handleApiError";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../../../components/ui/Dialog";
import { Button } from "../../../../../components/ui/Button";
import { ScoreboardInput } from "./ScoreboardInput";
import { TeamSelect } from "./TeamSelect";
import { DateTimeInput } from "./DateTimeInput";
import { RoundInput } from "./RoundInput";

interface MatchFormProps {
  mode: "create" | "edit";
  teams: Team[];
  initialData: MatchFormDataSubmit;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const MatchForm = ({
  mode,
  teams,
  open,
  onClose,
  initialData,
  onSuccess,
}: MatchFormProps) => {
  const [formData, setFormData] = useState<MatchFormDataSubmit>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setFormData(initialData);
      setError("");
    }
  }, [open, initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (mode === "edit" && formData.matchId) {
        await MatchService.update(formData.matchId, formData);
      } else {
        await MatchService.create(formData);
      }
      onSuccess();
    } catch (e) {
      setError(handleApiError(e));
    } finally {
      setIsLoading(false);
    }
  };

  const title = mode === "edit" ? "Atualizar Partida" : "Criar Nova Partida";
  const buttonText = mode === "edit" ? "Salvar Alterações" : "Criar Partida";

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle
            className={`text-center ${
              mode === "edit" ? "text-blue-700" : "text-emerald-700"
            }`}
          >
            {title}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 text-gray-800">
          <div className="grid grid-cols-[1fr_2fr_1fr] items-end gap-4">
            <TeamSelect
              teams={teams}
              value={formData.homeTeamId ?? 0}
              onChange={(value) =>
                setFormData({ ...formData, homeTeamId: value })
              }
              label="Time da Casa"
            />

            <ScoreboardInput
              initialScoreHome={formData.scoreHome}
              initialScoreAway={formData.scoreAway}
              onChange={(home, away) =>
                setFormData({ ...formData, scoreHome: home, scoreAway: away })
              }
            />

            <TeamSelect
              teams={teams}
              value={formData.awayTeamId ?? 0}
              onChange={(value) =>
                setFormData({ ...formData, awayTeamId: value })
              }
              label="Time de Fora"
              className="flex flex-col items-end"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <DateTimeInput
              initialDate={formData.date}
              onChange={(date) => setFormData({ ...formData, date })}
            />

            <RoundInput
              value={formData.round ?? 1}
              onChange={(round) => setFormData({ ...formData, round })}
            />
          </div>

          {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="cancel" size="sm" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              type="submit"
              variant={mode === "edit" ? "update" : "create"}
              size="sm"
              isLoading={isLoading}
            >
              {buttonText}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
