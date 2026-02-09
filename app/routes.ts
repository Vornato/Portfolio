// Kept as a lightweight local config to avoid hard dependency on @react-router/dev.
export type RouteConfig = Array<{ index?: boolean; file: string }>;

const routes: RouteConfig = [{ index: true, file: "routes/home.tsx" }];

export default routes;
