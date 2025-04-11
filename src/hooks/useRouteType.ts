// hooks/useRouteType.ts
import { useContext } from "react";
import { RouteTypeContext } from "../contexts/RouteTypeContext";
import { RouteTypeContextType } from "../types/route";

export function useRouteType(): RouteTypeContextType {
  const context = useContext(RouteTypeContext);
  if (!context) {
    throw new Error("useRouteType must be used within a RouteTypeProvider");
  }
  return context;
}
