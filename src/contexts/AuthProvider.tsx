import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService, LoginParams, UserData } from "../services/authService";
import { api } from "../services/api";
import { AuthContext } from "../contexts/AuthContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("refreshToken");
    api.defaults.headers.common["Authorization"] = "";
    setUser(null);
    setIsLoading(false);
    setIsAuthenticated(false);
    navigate("/");
    console.log("HandleLogout navegou /");
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const refreshToken = sessionStorage.getItem("refreshToken");

    if (!token && !refreshToken) {
      setUser(null);
      setIsLoading(false);
      setIsAuthenticated(false);
      return;
    }

    const validateAuth = async () => {
      try {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const userData = await AuthService.getUser();
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Erro ao validar autenticação:", error);
        handleLogout();
      } finally {
        setIsLoading(false);
      }
    };

    validateAuth();
  }, [handleLogout]);

  const login = async (params: LoginParams) => {
    try {
      const { token, refreshToken, user } = await AuthService.login(params);
      localStorage.setItem("token", token);
      sessionStorage.setItem("refreshToken", refreshToken);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(user);
      setIsAuthenticated(true);
      navigate("/dashboard");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw error;
    }
  };

  const logout = handleLogout;

  return (
    <AuthContext.Provider
      value={{ user, isLoading, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
