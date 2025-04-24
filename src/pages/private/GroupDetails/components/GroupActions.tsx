import { Button } from "../../../../components/ui/Button";

export const GroupActions = ({
  isLeaving,
  error,
  onLeave,
  isOwner,
}: {
  isLeaving: boolean;
  error: string | null;
  onLeave: () => void;
  isOwner: boolean;
}) => (
  <div className="bg-gray-800 rounded-lg p-6 mb-6">
    <h2 className="text-xl font-semibold text-gray-100 mb-4">Ações</h2>
    <div className="flex flex-col gap-4">
      {error && <>Erro</>}
      <Button
        onClick={onLeave}
        variant="delete"
        disabled={isLeaving}
        className="w-full md:w-auto"
      >
        {isLeaving ? "Saindo..." : "Sair do Grupo"}
      </Button>
      {isOwner && (
        <Button variant="default" className="w-full md:w-auto">
          Gerenciar Grupo
        </Button>
      )}
    </div>
  </div>
);
