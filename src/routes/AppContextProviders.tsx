import "react-toastify/dist/ReactToastify.min.css";

import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { ContextProviderDialog } from "@/providers/Dialog";
import { ContextProviderSocketIo } from "@/providers/SocketIo";

export function AppContextProviders() {
  return (
    <ContextProviderSocketIo>
      <ContextProviderDialog>
        <ToastContainer position="bottom-center" />
        <Outlet />
      </ContextProviderDialog>
    </ContextProviderSocketIo>
  );
}
