import { api } from "./api";

export const AuthService = {
  login: async (params: LoginParams): Promise<LoginResponse> => {
    const { data } = await api.post<LoginResponse>("auth/login", params);
    return data;
  },

  getUser: async () => {
    const { data } = await api.get("user/me");
    return data;
  },
};

export interface UserData {
  id: string;
  nickname: string;
}

export interface LoginParams {
  nickname: string;
  password: string;
}

interface LoginResponse {
  token: string;
  refreshToken: string;
  user: UserData;
}
