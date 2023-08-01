import { useContextSocketIo } from "@/providers/SocketIo";

export const useListenDisconnect = (handler: () => void) => {
  const socketIo = useContextSocketIo();

  socketIo.on("disconnect", () => {
    handler();
  });
};
