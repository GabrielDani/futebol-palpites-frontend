import { useEffect } from "react";
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

  useEffect(() => {
    console.log("[AuthProvider] useEffect [setUser, setIsLoading, logout]");
    const validateAuth = async () => {
      try {
        console.log("[AuthProvider] Validando autenticação...");
        const token = TokenService.getToken();
        if (!token) return;

        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const userData = await AuthService.getUser();
        console.log(
          "[AuthProvider][useEffect[setUser, setIsLoading, logout]] Usuário:",
          userData
        );
        setUser(userData);
      } catch (error) {
        console.error("[AuthProvider] Erro de autenticação: ", error);
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    validateAuth();
  }, [setUser, setIsLoading, logout]);

  return (
    <AuthContext.Provider
      value={{ user, isLoading, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
