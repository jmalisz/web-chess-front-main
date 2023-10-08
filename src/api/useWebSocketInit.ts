import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { z } from "zod";

import { IS_DEV, SOCKET_IO_URL } from "@/config/env";

const SESSION_ID_LS_KEY = "sessionId";

const connectedDataSchema = z.object({
  sessionId: z.string(),
});

export const useWebSocketInit = () => {
  if (!SOCKET_IO_URL) throw new Error("Missing SOCKET_IO_URL env");

  const { origin, pathname } = new URL(SOCKET_IO_URL);

  const [socketIo, setSocketIo] = useState<Socket>(
    io(origin, {
      path: `${pathname}/socket.io`,
      transports: ["websocket"],
      auth: (cb) => cb({ sessionId: localStorage.getItem(SESSION_ID_LS_KEY) }),
      autoConnect: false,
    }),
  );

  // Set up listeners and session
  useEffect(() => {
    // This is in general redundant, but required to work with double effect in React strict mode
    const newSocketIo = io(origin, {
      path: `${pathname}/socket.io`,
      transports: ["websocket"],
      auth: (cb) => cb({ sessionId: localStorage.getItem(SESSION_ID_LS_KEY) }),
    });
    setSocketIo(newSocketIo);
    // Provides socket logs on client
    if (IS_DEV) {
      newSocketIo.onAny((event, ...args) => {
        // eslint-disable-next-line no-console
        console.log(event, args);
      });
      // eslint-disable-next-line no-console
      console.log("Socket created:", newSocketIo);
    }

    newSocketIo.on("connected", (data) => {
      const { sessionId } = connectedDataSchema.parse(data);
      newSocketIo.auth = { sessionId };
      localStorage.setItem(SESSION_ID_LS_KEY, sessionId);
    });

    return () => {
      newSocketIo.close();
    };
  }, [origin, pathname]);

  return {
    socketIo,
  };
};
