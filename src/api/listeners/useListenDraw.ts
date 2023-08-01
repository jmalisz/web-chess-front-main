import { useContextSocketIo } from "@/providers/SocketIo";

export const useListenDraw = (handler: () => void) => {
  const socketIo = useContextSocketIo();

  socketIo.on("draw", () => {
    handler();
  });
};
