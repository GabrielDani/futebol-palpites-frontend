// src/types/auth.ts
export type UserData = {
  id: string;
  email: string;
  name: string;
};

export type LoginParams = {
  nickname: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  refreshToken: string;
  user: UserData;
};

export type RegisterParams = {
  nickname: string;
  password: string;
};

// Tipo base para autenticação
export type AuthBase = {
  user: UserData | null;
  isLoading: boolean;
  isAuthenticated: boolean;
};

// Tipo estendido para o contexto
export type AuthContextType = AuthBase & {
  login: (params: LoginParams) => Promise<void>;
  logout: () => void;
};

type AuthSetters = {
  setUser: (user: UserData | null) => void;
  setIsLoading: (isLoading: boolean) => void;
};

// Tipo estendido para estado interno
export type AuthState = AuthBase & AuthSetters;
