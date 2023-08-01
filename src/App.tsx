import { RouterProvider } from "react-router-dom";

import { ContextProviderDialog } from "@/providers/Dialog";
import { ContextProviderSocketIo } from "@/providers/SocketIo";

import { router } from "./config/router";

export function App() {
  return (
    <ContextProviderSocketIo>
      <ContextProviderDialog>
        <RouterProvider router={router} />
      </ContextProviderDialog>
    </ContextProviderSocketIo>
  );
}
