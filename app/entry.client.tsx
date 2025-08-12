import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

hydrateRoot(
  document,
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL} />
  </StrictMode>
);
