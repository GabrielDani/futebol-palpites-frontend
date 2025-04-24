import { LoginParams, LoginResponse, RegisterParams } from "../types/auth";
import { api } from "./api";

export const AuthService = {
  login: async (params: LoginParams): Promise<LoginResponse> => {
    const { data } = await api.post<LoginResponse>("auth/login", params);
    return data;
  },

  logout: async (refreshToken: string): Promise<void> => {
    console.log("[AuthService][logout] Logout sendo feito...");
    const { data } = await api.post("auth/logout", { refreshToken });
    console.log("[AuthService][logout] Logout feito", data);
    return data;
  },

  register: async (params: RegisterParams) => {
    const data = await api.post("user", params);
    return data;
  },

  getUser: async () => {
    const { data } = await api.get("user/me");
    return data;
  },
};
