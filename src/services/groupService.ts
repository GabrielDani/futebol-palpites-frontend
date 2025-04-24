// services/GroupService.ts
import { api } from "./api";
import { Group, GroupDetails } from "../types/group";

class GroupService {
  static async getPublicGroups(): Promise<Group[]> {
    console.log("[GroupService][getPublicGroups] Buscando Grupos Públicos...");
    const { data } = await api.get("/groups/public");
    console.log("[GroupService][getPublicGroups] Grupos Públicos:", data);
    return data;
  }

  static async getPrivateGroups(): Promise<Group[]> {
    console.log("[GroupService][getPublicGroups] Buscando Grupos Privados...");
    const { data } = await api.get("/groups/private");
    console.log("[GroupService][getPrivateGroups] Grupos Privados:", data);
    return data;
  }

  static async getMyGroups(): Promise<Group[]> {
    console.log("[GroupService][getMyGroups] Buscando meus Grupos...");
    const { data } = await api.get(`/groups/mygroups`);
    console.log("[GroupService][getMyGroups] Meus Grupos", data);
    return data;
  }

  static async joinGroup(groupId: string): Promise<void> {
    await api.post(`/groups/${groupId}/join`);
  }

  static async joinPrivateGroup(
    groupId: string,
    password: string
  ): Promise<void> {
    await api.post(`/groups/${groupId}/join`, { password });
  }

  static async getGroupDetails(groupId: string): Promise<GroupDetails> {
    console.log(
      "[GroupService][getGroupDetails] Buscando detalhes do grupo..."
    );
    const { data } = await api.get(`/groups/${groupId}/details`);
    console.log("[GroupService][getGroupDetails] Detalhes", data);
    return data;
  }

  static async leaveGroup(groupId: string): Promise<void> {
    console.log(`[GroupService][getGroupDetails] Saindo do Grupo ${groupId}`);
    const { data } = await api.post(`/groups/${groupId}/leave`);
    console.log("[GroupService][getGroupDetails] Saiu do Grupo");
    return data;
  }
}

export default GroupService;
