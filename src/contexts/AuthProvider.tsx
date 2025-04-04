import { useCallback, useEffect } from "react";
import { AuthService } from "../services/authService";
import { api } from "../services/api";
import { AuthContext } from "../contexts/AuthContext";
import { useAuthState } from "../hooks/useAuthState";
import { useAuthActions } from "../hooks/useAuthActions";
import { TokenService } from "../services/tokenService";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const authState = useAuthState();
  const { user, isLoading, isAuthenticated, setUser, setIsLoading } = authState;
  const { login, logout } = useAuthActions(authState);

  // Log de montagem inicial
  useEffect(() => {
    console.log("[AuthProvider] Montado inicialmente");
    return () => console.log("[AuthProvider] Desmontado");
  }, []);

  // Log de renderizações
  useEffect(() => {
    console.log("[AuthProvider] Estado atualizado", {
      user: !!user,
      isLoading,
    });
  });

  const stableLogout = useCallback(() => {
    logout();
  }, [logout]);

  useEffect(() => {
    const validateAuth = async () => {
      try {
        setIsLoading(true);
        console.log("[AuthProvider] Validando autenticação...");
        const token = TokenService.getToken();
        if (!token) return;

        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const userData = await AuthService.getUser();
        setUser(userData);
      } catch (error) {
        console.error("Erro ao validar autenticação:", error);
        stableLogout();
      } finally {
        setIsLoading(false);
      }
    };

    validateAuth();
  }, [setUser, setIsLoading, stableLogout]);

  return (
    <AuthContext.Provider
      value={{ user, isLoading, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
