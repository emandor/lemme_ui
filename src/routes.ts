import { lazy } from "solid-js";

const routes = [
  {
    path: "/",
    name: "Home",
    public: false,
    component: lazy(() => import("./pages/Home")),
  },
  {
    path: "/login",
    name: "Login",
    public: true,
    component: lazy(() => import("./pages/Login")),
  },
] as const;

export const privateRoutes = routes.filter((r) => !r.public);
export const publicRoutes = routes.filter((r) => r.public);

type Route = (typeof routes)[number];
export type { Route };

// Create a mapping of route names to route objects for easy access
// e.g., routesByName["Home"] to get the home route object
// covince TypeScript that all route names are unique
export const routesByName = routes.reduce(
  (acc, route) => {
    acc[route.name] = route;
    return acc;
  },
  {} as Record<Route["name"], Route>,
);

export default routes;
