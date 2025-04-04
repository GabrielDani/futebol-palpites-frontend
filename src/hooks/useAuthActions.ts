import { useCallback } from "react";
import { api } from "../services/api";
import { AuthService } from "../services/authService";
import { TokenService } from "../services/tokenService";
import { AuthState, LoginParams } from "../types/auth";

export const useAuthActions = ({
  setUser,
  setIsLoading,
}: Pick<AuthState, "setUser" | "setIsLoading">) => {
  const login = useCallback(
    async (params: LoginParams) => {
      try {
        setIsLoading(true);
        const { token, refreshToken, user } = await AuthService.login(params);

        TokenService.setToken(token);
        sessionStorage.setItem("refreshToken", refreshToken);
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        setUser(user);
      } catch (error) {
        console.error("Erro ao fazer login:", error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [setUser, setIsLoading]
  );

  const logout = useCallback(() => {
    setIsLoading(true);
    try {
      TokenService.clearTokens();
      api.defaults.headers.common["Authorization"] = "";
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, [setUser, setIsLoading]);

  return { login, logout };
};
