import { useCallback } from "react";
import { api } from "../services/api";
import { AuthService } from "../services/authService";
import { TokenService } from "../services/tokenService";
import { AuthState, LoginParams } from "../types/auth";

export const useAuthActions = ({ setUser }: Pick<AuthState, "setUser">) => {
  const login = useCallback(
    async (params: LoginParams) => {
      try {
        console.log("[useAuthActions] Login disparado.");
        const { token, refreshToken, user } = await AuthService.login(params);

        TokenService.setToken(token);
        TokenService.setRefreshToken(refreshToken);
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        setUser(user);
      } catch (error) {
        console.error("[useAuthActions] Erro no Login:", error);
        throw error;
      }
    },
    [setUser]
  );

  const logout = useCallback(async () => {
    console.log("[useAuthActions] Logout disparado.");
    try {
      await AuthService.logout(TokenService.getRefreshToken() ?? "");
    } catch (e) {
      console.error("[useAuthActions][logout] Erro", e);
    } finally {
      TokenService.clearTokens();
      api.defaults.headers.common["Authorization"] = "";
      setUser(null);
    }
  }, [setUser]);

  return { login, logout };
};
