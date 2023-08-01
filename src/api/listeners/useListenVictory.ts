import { useContextSocketIo } from "@/providers/SocketIo";

export const useListenVictory = (handler: () => void) => {
  const socketIo = useContextSocketIo();

  socketIo.on("victory", () => {
    handler();
  });
};
