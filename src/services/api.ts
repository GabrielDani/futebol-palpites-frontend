import axios from "axios";

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
      sessionStorage.removeItem("refreshToken");
      localStorage.removeItem("token");
      return Promise.reject(error);
    }

    if (error.response?.status === 401) {
      const refreshToken = sessionStorage.getItem("refreshToken");
      if (!refreshToken) {
        return Promise.reject(error);
      }

      try {
        originalRequest._retry = true;

        const response = await axios.post(`${baseUrl}/auth/refresh`, {
          refreshToken,
        });
        const { token } = response.data;

        localStorage.setItem("token", token);
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        originalRequest.headers.Authorization = `Bearer ${token}`;

        return api(originalRequest);
      } catch (refreshError) {
        sessionStorage.removeItem("refreshToken");
        localStorage.removeItem("token");
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
