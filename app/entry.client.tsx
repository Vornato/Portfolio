import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes";

// Strip trailing slash from BASE_URL
const BASENAME = (import.meta.env.BASE_URL || "/Portfolio/").replace(/\/+$/, "");

const router = createBrowserRouter(routes, { basename: BASENAME });

hydrateRoot(
  document.getElementById("root")!,
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
