// app/root.tsx
import * as React from "react";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

/** External fonts & any extra <link> tags */
export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

/** App-wide HTML shell */
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full bg-[#0B0B13] text-white antialiased">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

/** Root route element – renders your nested routes via <Outlet /> */
export default function App() {
  return <Outlet />;
}

/** Nice error UI (works in dev & prod) */
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let title = "Oops!";
  let message = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    title = error.status === 404 ? "404" : "Error";
    message =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || message;
  } else if (import.meta.env.DEV && error instanceof Error) {
    message = error.message;
    stack = error.stack;
  }

  return (
    <main className="min-h-screen p-6 container mx-auto">
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <p className="text-zinc-300 mb-4">{message}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto rounded-lg bg-black/50 text-xs leading-relaxed">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
