import { useEffect } from "react";

import { RequestError } from "@/models/RequestError";
import { useContextSocketIo } from "@/providers/SocketIo";

const EVENT_NAME = "error";

export const useListenError = (handler: (requestError: RequestError) => void) => {
  const socketIo = useContextSocketIo();

  useEffect(() => {
    socketIo.on(EVENT_NAME, (data: RequestError) => {
      handler(data);
    });

    return () => {
      socketIo.removeListener(EVENT_NAME);
    };
  }, [handler, socketIo]);
};
