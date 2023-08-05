import { useEffect } from "react";

import { useContextSocketIo } from "@/providers/SocketIo";

const EVENT_NAME = "victory";

export const useListenVictory = (handler: () => void) => {
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
