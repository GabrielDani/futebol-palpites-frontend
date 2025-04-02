import { useCallback, useEffect, useState } from "react";
import { api } from "../services/api";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  nickname: string;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("refreshToken");
    api.defaults.headers.common["Authorization"] = "";
    setUser(null);
    navigate("/login");
  }, [navigate]);

  useEffect(() => {
    setLoading(true);

    const token = localStorage.getItem("token");
    const refreshToken = sessionStorage.getItem("refreshToken");

    if (!token && !refreshToken) {
      api.defaults.headers.common["Authorization"] = "";
      setUser(null);
      setLoading(false);
      return;
    }

    const validateAuth = async () => {
      try {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const { data } = await api.get("user/me");
        setUser(data);
      } catch {
        handleLogout();
      } finally {
        setLoading(false);
      }
    };

    validateAuth();
  }, [handleLogout]);

  useEffect(() => {
    if (user) setIsAuthenticated(true);
    else setIsAuthenticated(false);
  }, [user]);

  const login = async (nickname: string, password: string) => {
    const { data } = await api.post("auth/login", { nickname, password });
    localStorage.setItem("token", data.token);
    sessionStorage.setItem("refreshToken", data.refreshToken);
    api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
    setUser(data.user);
  };

  const logout = () => {
    handleLogout();
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
