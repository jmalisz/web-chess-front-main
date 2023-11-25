import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { AppRouter } from "@/routes/AppRouter";

const root = document.querySelector("#root");

if (!root) throw new Error("Root is missing!");

createRoot(root).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>,
);
