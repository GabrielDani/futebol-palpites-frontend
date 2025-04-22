import { useState, useEffect, useCallback } from "react";
import { Match, MatchFormDataSubmit, Team } from "../../../types/match";
import { handleApiError } from "../../../utils/handleApiError";
import { MatchForm } from "./components/MatchForm/MatchForm";
import { PlusCircle } from "lucide-react";
import { MatchService } from "../../../services/matchService";
import { TeamService } from "../../../services/teamService";
import { PageLayout } from "../../../components/layout/PageLayout";
import { Button } from "../../../components/ui/Button";
import { RoundControls } from "../../../components/ui/guess/components/RoundControls";
import { Section } from "../../../components/ui/Section";
import { MatchTable } from "./components/MatchForm/MatchTable";

export const MatchesManager = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [formData, setFormData] = useState<MatchFormDataSubmit>({});
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");
  const [currentRound, setCurrentRound] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMatches = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await MatchService.getAll();
      setMatches(data);
    } catch (error) {
      console.error("Erro ao buscar partidas", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchTeams = useCallback(async () => {
    try {
      const data = await TeamService.getAll();
      setTeams(data);
    } catch (e) {
      console.error(
        "[MatchesManager][fetchTeams] Erro ao buscar times",
        handleApiError(e)
      );
    }
  }, []);

  useEffect(() => {
    fetchMatches();
    fetchTeams();
  }, [fetchMatches, fetchTeams]);

  const handleRoundChange = (direction: "next" | "prev") => {
    setCurrentRound((prev) => {
      if (direction === "next" && prev < 38) return prev + 1;
      if (direction === "prev" && prev > 1) return prev - 1;
      return prev;
    });
  };

  const handleEdit = useCallback((match: Match) => {
    setFormMode("edit");
    setFormData({
      matchId: match.id,
      homeTeamId: match.homeTeam.id,
      awayTeamId: match.awayTeam.id,
      scoreHome: match.scoreHome,
      scoreAway: match.scoreAway,
      date: match.date,
      round: match.round,
    });
    setIsFormOpen(true);
  }, []);

  const handleDelete = useCallback(
    async (id: string) => {
      if (!confirm("Tem certeza que deseja deletar esta partida?")) return;
      try {
        await MatchService.delete(id);
        await fetchMatches(); // Recarrega as partidas após exclusão
      } catch (error) {
        console.error("Erro ao deletar partida", error);
      }
    },
    [fetchMatches]
  );

  const handleFormSuccess = useCallback(() => {
    fetchMatches(); // Recarrega as partidas após sucesso
    setIsFormOpen(false);
  }, [fetchMatches]);

  const currentRoundMatches = matches.filter(
    (match) => match.round === currentRound
  );

  return (
    <PageLayout>
      <div className="flex justify-end px-11 mb-5">
        <Button
          variant="create"
          size="sm"
          className="gap-1 tracking-tight"
          onClick={() => {
            setFormMode("create");
            setFormData({});
            setIsFormOpen(true);
          }}
        >
          <PlusCircle className="w-4 h-4" />
          Criar
        </Button>
      </div>

      <Section bgColor="bg-indigo-900/80" spacing={{ padding: "py-5" }}>
        <RoundControls
          className="px-10 text-indigo-100"
          currentRound={currentRound}
          onNext={() => handleRoundChange("next")}
          onPrev={() => handleRoundChange("prev")}
        />
        <MatchTable
          matches={currentRoundMatches}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isLoading={isLoading}
        />
      </Section>

      <MatchForm
        mode={formMode}
        teams={teams}
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        initialData={formData}
        onSuccess={handleFormSuccess}
      />
    </PageLayout>
  );
};
