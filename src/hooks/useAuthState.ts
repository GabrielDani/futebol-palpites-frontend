// src/hooks/useAuthState.ts
import { useState } from "react";
import { AuthState, UserData } from "../types/auth";

export const useAuthState = (): AuthState => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    setUser,
    setIsLoading,
  };
};
