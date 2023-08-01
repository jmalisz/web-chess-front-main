import { Outlet } from "react-router-dom";

import { ContextProviderDialog } from "@/providers/Dialog";
import { ContextProviderSocketIo } from "@/providers/SocketIo";

export function ContextProviders() {
  return (
    <ContextProviderSocketIo>
      <ContextProviderDialog>
        <Outlet />
      </ContextProviderDialog>
    </ContextProviderSocketIo>
  );
}
