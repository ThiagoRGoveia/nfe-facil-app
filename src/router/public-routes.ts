export const publicRoutes = ["/", "/login", "/callback", "/error"] as const;

export type PublicRoute = (typeof publicRoutes)[number];

export function isPublicRoute(route: string): route is PublicRoute {
  return publicRoutes.includes(route as PublicRoute);
}
