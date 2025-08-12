// app/entry.client.tsx
import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./root";
import IndexPage from "./routes/_index";
import Home from "./routes/home";

const BASENAME = (import.meta.env.BASE_URL || "/Portfolio/").replace(/\/+$/, "");

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Root />,
      children: [
        { index: true, element: <IndexPage /> },
        { path: "home", element: <Home /> },
        // Fallback for GH Pages deep links
        { path: "*", element: <IndexPage /> },
      ],
    },
  ],
  { basename: BASENAME }
);

hydrateRoot(
  document.getElementById("root")!,
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
