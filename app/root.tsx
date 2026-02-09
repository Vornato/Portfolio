// app/root.tsx
import * as React from "react";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import "./app.css";

export const meta = () => [
  { charSet: "utf-8" },
  { title: "Vornato Portfolio" },
  { name: "viewport", content: "width=device-width, initial-scale=1" },
  { name: "theme-color", content: "#0B0B13" },
];

export const links = () => [];

export function Layout() {
  // Add <base href="..."> so relative links & assets work under /Portfolio/
  const baseHref = import.meta.env.BASE_URL || "/";

  return (
    <html lang="en" className="bg-zinc-950 text-zinc-100">
      <head>
        <Meta />
        <base href={baseHref} />
        {/* Inter + Georgian font for consistent bilingual rendering */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Noto+Sans+Georgian:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

// Optional: what to show during partial hydration
export function HydrateFallback() {
  return <div style={{ padding: 16 }}>Loading...</div>;
}
