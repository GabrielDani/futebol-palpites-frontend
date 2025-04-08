import axios from "axios";
import { TokenService } from "./tokenService";

const baseUrl = "http://localhost:3000";

export const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log("[api interceptor] Erro: ", error);
    const originalRequest = error.config;

    // Evita loop em caso de falha no refresh
    if (originalRequest.url === "/auth/refresh" || originalRequest._retry) {
      console.log("[api interceptor] Falha no refresh, limpando tokens...");
      TokenService.clearTokens();
      return Promise.reject(error);
    }

    if (error.response?.status === 401) {
      const refreshToken = TokenService.getRefreshToken();
      if (!refreshToken) {
        console.log("[api interceptor] RefreshToken não encontrado.");
        return Promise.reject(error);
      }

      try {
        originalRequest._retry = true;

        const response = await axios.post(`${baseUrl}/auth/refresh`, {
          refreshToken,
        });
        const { token } = response.data;
        console.log("[api interceptor] Novo token: ", token);

        TokenService.setToken(token);
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        originalRequest.headers.Authorization = `Bearer ${token}`;

        return api(originalRequest);
      } catch (refreshError) {
        console.log(
          "[api interceptor] Falha no refresh (catch), limpando tokens..."
        );
        TokenService.clearTokens();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
