import { Button } from "../../../../components/ui/Button";
import { Input } from "../../../../components/ui/Input";
import { Modal } from "../../../../components/ui/Modal";
import { Group } from "../../../../types/group";

interface Props {
  isOpen: boolean;
  group: Group | null;
  password: string;
  error: string;
  onPasswordChange: (value: string) => void;
  onSubmit: () => void;
  onClose: () => void;
}

export const PrivateGroupModal = ({
  isOpen,
  group,
  password,
  error,
  onPasswordChange,
  onSubmit,
  onClose,
}: Props) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    title={`Entrar no Grupo ${group?.name}`}
  >
    <div className="space-y-4">
      <Input
        type="password"
        value={password}
        onChange={(e) => onPasswordChange(e.target.value)}
        placeholder="Digite a senha do grupo"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button onClick={onSubmit} className="w-full" variant="default">
        Entrar
      </Button>
    </div>
  </Modal>
);
