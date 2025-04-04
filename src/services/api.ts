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
    const originalRequest = error.config;

    // Evita loop em caso de falha no refresh
    if (originalRequest.url === "/auth/refresh" || originalRequest._retry) {
      TokenService.clearTokens();
      return Promise.reject(error);
    }

    if (error.response?.status === 401) {
      const refreshToken = !TokenService.getRefreshToken();
      if (!refreshToken) {
        return Promise.reject(error);
      }

      try {
        originalRequest._retry = true;

        const response = await axios.post(`${baseUrl}/auth/refresh`, {
          refreshToken,
        });
        const { token } = response.data;

        TokenService.setToken(token);
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        originalRequest.headers.Authorization = `Bearer ${token}`;

        return api(originalRequest);
      } catch (refreshError) {
        TokenService.clearTokens();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
