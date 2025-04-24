import { useEffect, useState } from "react";
import GroupService from "../services/groupService";
import { Group } from "../types/group";

export const useGroupsData = () => {
  const [publicGroups, setPublicGroups] = useState<Group[]>([]);
  const [privateGroups, setPrivateGroups] = useState<Group[]>([]);
  const [userGroups, setUserGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadGroups = async () => {
    try {
      setLoading(true);
      setError(null);

      const [publicData, privateData, userData] = await Promise.all([
        GroupService.getPublicGroups(),
        GroupService.getPrivateGroups(),
        GroupService.getMyGroups(),
      ]);

      const publicGroupsNotJoined = publicData.filter(
        (publicGroup) =>
          !userData.some((userGroup) => userGroup.id === publicGroup.id)
      );
      const privateGroupsNotJoined = privateData.filter(
        (privateGroup) =>
          !userData.some((userGroup) => userGroup.id === privateGroup.id)
      );

      setPublicGroups(publicGroupsNotJoined);
      setPrivateGroups(privateGroupsNotJoined);
      setUserGroups(userData);
    } catch (err) {
      setError("Failed to load groups");
      console.error("Error loading groups:", err);
    } finally {
      setLoading(false);
    }
  };

  const refreshGroups = async () => {
    await loadGroups();
  };

  useEffect(() => {
    loadGroups();
  }, []);

  return {
    publicGroups,
    privateGroups,
    userGroups,
    loading,
    error,
    refreshGroups,
  };
};
