export const TokenService = {
  getToken: () => localStorage.getItem("token"),
  setToken: (token: string) => localStorage.setItem("token", token),
  getRefreshToken: () => sessionStorage.getItem("refreshToken"),
  setRefreshToken: (refreshToken: string) =>
    sessionStorage.setItem("refreshToken", refreshToken),

  clearTokens: () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("refreshToken");
  },
};
