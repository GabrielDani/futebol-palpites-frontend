import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GroupService from "../services/groupService";
import { handleApiError } from "../utils/handleApiError";

export const useGroupActions = (refreshGroups: () => Promise<void>) => {
  const navigate = useNavigate();
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleNavigateToGroup = (groupId: string) => {
    navigate(`/grupos/${groupId}`);
  };

  const handleJoinPublicGroup = async (groupId: string) => {
    try {
      await GroupService.joinGroup(groupId);
      await refreshGroups();
    } catch (e) {
      setError(handleApiError(e));
    }
  };

  const handleJoinPrivateGroup = async () => {
    if (!selectedGroupId || !password) return;

    try {
      await GroupService.joinPrivateGroup(selectedGroupId, password);
      setSelectedGroupId(null);
      setPassword("");
      await refreshGroups();
    } catch {
      setError("Senha incorreta ou grupo não encontrado");
    }
  };

  return {
    selectedGroupId,
    setSelectedGroupId,
    password,
    setPassword,
    error,
    handleNavigateToGroup,
    handleJoinPublicGroup,
    handleJoinPrivateGroup,
  };
};
