import { useState, useEffect, useCallback } from "react";
import { GroupDetails } from "../types/group";
import GroupService from "../services/groupService";

export const useGroupDetails = (groupId: string) => {
  const [group, setGroup] = useState<GroupDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadGroupDetails = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const groupData = await GroupService.getGroupDetails(groupId);
      setGroup(groupData);
    } catch (err) {
      setError("Failed to load group details");
      console.error("Error loading group:", err);
    } finally {
      setLoading(false);
    }
  }, [groupId]);

  useEffect(() => {
    loadGroupDetails();
  }, [loadGroupDetails]);

  return {
    group,
    loading,
    error,
    refresh: loadGroupDetails,
  };
};
