import { useEffect } from "react";

import { useContextSocketIo } from "@/providers/SocketIo";

const EVENT_NAME = "undoAsk";

export const useListenUndoAsk = (handler: () => void) => {
  const socketIo = useContextSocketIo();

  useEffect(() => {
    socketIo.on(EVENT_NAME, () => {
      handler();
    });

    return () => {
      socketIo.removeListener(EVENT_NAME);
    };
  }, [handler, socketIo]);
};
