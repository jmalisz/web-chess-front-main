import type { PropsWithChildren } from "react";
import { createContext, useContext, useMemo } from "react";
import type { Socket } from "socket.io-client";

import { useWebSocketInit } from "@/api/useWebSocketInit";

const ContextSocketIo = createContext<Socket | undefined>(undefined);

export function ContextProviderSocketIo({ children }: PropsWithChildren) {
  const { socketIo } = useWebSocketInit();

  const contextValue = useMemo(() => socketIo, [socketIo]);

  return <ContextSocketIo.Provider value={contextValue}> {children} </ContextSocketIo.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useContextSocketIo() {
  const socketIo = useContext(ContextSocketIo);

  if (!socketIo) throw new Error("useContextSocketIo must be used within ContextProviderSocketIo");

  return socketIo;
}
