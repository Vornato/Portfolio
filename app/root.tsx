<<<<<<< HEAD
// app/root.tsx
import * as React from "react";
=======
>>>>>>> 3e4b75e (Configure Vite base for GitHub Pages and add deploy workflow)
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

<<<<<<< HEAD
/** External fonts & any extra <link> tags */
=======
>>>>>>> 3e4b75e (Configure Vite base for GitHub Pages and add deploy workflow)
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

<<<<<<< HEAD
/** App-wide HTML shell */
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
=======
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
>>>>>>> 3e4b75e (Configure Vite base for GitHub Pages and add deploy workflow)
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
<<<<<<< HEAD
      <body className="h-full bg-[#0B0B13] text-white antialiased">
=======
      <body>
>>>>>>> 3e4b75e (Configure Vite base for GitHub Pages and add deploy workflow)
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

<<<<<<< HEAD
/** Root route element – renders your nested routes via <Outlet /> */
=======
>>>>>>> 3e4b75e (Configure Vite base for GitHub Pages and add deploy workflow)
export default function App() {
  return <Outlet />;
}

<<<<<<< HEAD
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
=======
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
>>>>>>> 3e4b75e (Configure Vite base for GitHub Pages and add deploy workflow)
    stack = error.stack;
  }

  return (
<<<<<<< HEAD
    <main className="min-h-screen p-6 container mx-auto">
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <p className="text-zinc-300 mb-4">{message}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto rounded-lg bg-black/50 text-xs leading-relaxed">
=======
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
>>>>>>> 3e4b75e (Configure Vite base for GitHub Pages and add deploy workflow)
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
