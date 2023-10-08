import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { AppRouter } from "@/routes/AppRouter";

createRoot(document.querySelector("#root")!).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>,
);
