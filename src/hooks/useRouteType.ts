// hooks/useRouteType.ts
import { useContext } from "react";
import { RouteTypeContext } from "../contexts/RouteTypeContext";

export const useRouteType = () => {
  const context = useContext(RouteTypeContext);
  if (!context) {
    throw new Error("useRouteType must be used within a RouteTypeProvider");
  }
  return context;
};
