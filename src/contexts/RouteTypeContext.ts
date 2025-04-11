// contexts/RouteTypeContext.tsx
import { createContext } from "react";
import { RouteType, RouteTypeContextType } from "../types/route";

export const RouteTypeContext = createContext<RouteTypeContextType>({
  routeType: RouteType.PUBLIC,
});
