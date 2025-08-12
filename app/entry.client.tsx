// app/entry.client.tsx
import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./root";
import IndexPage from "./routes/_index";
import Home from "./routes/home";

// Vite sets BASE_URL to "/Portfolio/" when base is configured.
// We strip the trailing slash so Router basename is "/Portfolio"
const BASENAME = (import.meta.env.BASE_URL || "/Portfolio/").replace(/\/+$/, "");

// Create a plain browser router (SPA) – perfect for GitHub Pages
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Root />,
      children: [
        { index: true, element: <IndexPage /> },
        { path: "home", element: <Home /> },
        // Fallback for deep links on GH Pages (hard refresh)
        { path: "*", element: <IndexPage /> },
      ],
    },
  ],
  { basename: BASENAME }
);

// Hydrate into the <div id="root"></div> that your static index.html contains
hydrateRoot(
  document.getElementById("root")!,
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
