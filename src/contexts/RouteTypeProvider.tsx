import { ReactNode } from "react";
import { RouteType } from "../types/route";
import { RouteTypeContext } from "./RouteTypeContext";

interface RouteTypeProviderProps {
  children: ReactNode;
  value: RouteType;
}

export function RouteTypeProvider({ children, value }: RouteTypeProviderProps) {
  return (
    <RouteTypeContext.Provider value={{ routeType: value }}>
      {children}
    </RouteTypeContext.Provider>
  );
}
