// app/routes.ts
import { createBrowserRouter } from "react-router-dom";
import Root from "./root";
import IndexPage from "./routes/_index"; // ✅ this is your _index.tsx file
import Home from "./routes/home";

// Vite injects a trailing slash in BASE_URL, e.g. "/Portfolio/"
const BASENAME = (import.meta.env.BASE_URL || "/Portfolio/").replace(/\/+$/, "/");

const router = createBrowserRouter(
  [
    {
      path: "/",            // keep "/" here; basename adds the "/Portfolio" prefix in prod
      element: <Root />,
      children: [
        { index: true, element: <IndexPage /> }, // ✅ use the component from _index.tsx
        { path: "home", element: <Home /> },
        // GH Pages hard-refresh safety: unknown paths go to index
        { path: "*", element: <IndexPage /> },
      ],
    },
  ],
  { basename: BASENAME }    // ✅ set basename on the router (not on RouterProvider)
);

export default router;
