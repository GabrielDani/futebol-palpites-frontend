// contexts/route-types.ts
export enum RouteType {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE",
  ADMIN = "ADMIN",
}

export type RouteTypeContextType = {
  routeType: RouteType;
  setRouteType?: (type: RouteType) => void;
};
