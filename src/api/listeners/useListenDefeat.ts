import { useContextSocketIo } from "@/providers/SocketIo";

export const useListenDefeat = (handler: () => void) => {
  const socketIo = useContextSocketIo();

  socketIo.on("defeat", () => {
    handler();
  });
};
