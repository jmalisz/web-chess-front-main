import { useContextSocketIo } from "@/providers/SocketIo";

export const useListenUndoAsk = (handler: () => void) => {
  const socketIo = useContextSocketIo();

  socketIo.on("undoAsk", () => {
    handler();
  });
};
