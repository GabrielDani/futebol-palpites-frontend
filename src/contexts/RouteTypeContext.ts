// contexts/RouteTypeContext.tsx
import { createContext } from "react";
import { RouteTypeContextType } from "../types/route";

export const RouteTypeContext = createContext<RouteTypeContextType>(
  {} as RouteTypeContextType
);
