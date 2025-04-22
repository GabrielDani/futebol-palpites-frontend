import { useEffect, useState } from "react";
import { RouteType } from "../types/route";
import { RouteTypeContext } from "./RouteTypeContext";

interface RouteTypeProviderProps {
  children: React.ReactNode;
  value: RouteType;
}

export const RouteTypeProvider = ({
  children,
  value,
}: RouteTypeProviderProps) => {
  const [routeType, setRouteType] = useState(value);

  useEffect(() => {
    console.log("[RouteTypeProvider][useEffect[]] routeType:", routeType);
  });

  useEffect(() => {
    if (value !== routeType) {
      setRouteType(value);
      console.log(
        "[RouteTypeProvider][useEffect[routeType, setRouteType] routeType:",
        routeType
      );
    }
  }, [routeType, value]);

  return (
    <RouteTypeContext.Provider value={{ routeType, setRouteType }}>
      {children}
    </RouteTypeContext.Provider>
  );
};
