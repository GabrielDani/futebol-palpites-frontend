import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GroupService from "../services/groupService";

export const useGroupDetailsActions = (
  groupId: string,
  refreshGroup: () => Promise<void>
) => {
  const navigate = useNavigate();
  const [isLeaving, setIsLeaving] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const leaveGroup = async () => {
    try {
      setIsLeaving(true);
      setActionError(null);
      await GroupService.leaveGroup(groupId);
      navigate("/grupos");
    } catch (err) {
      setActionError("Failed to leave group");
      console.error("Error leaving group:", err);
    } finally {
      setIsLeaving(false);
    }
  };

  return {
    isLeaving,
    actionError,
    leaveGroup,
    refreshGroup,
  };
};
