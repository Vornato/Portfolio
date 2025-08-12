import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "../app/app.css"; // reuse your existing global styles
import "./styles.css";
import "./styles.css"; // and styles.css contains:  @import "tailwindcss";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename="/Portfolio">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
