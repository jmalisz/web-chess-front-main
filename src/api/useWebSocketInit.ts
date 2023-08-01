import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { z } from "zod";

import { IS_DEV, SOCKET_IO_URL } from "@/config/env";

const SESSION_ID_LS_KEY = "sessionId";

const connectedDataSchema = z.object({
  sessionId: z.string(),
});

const connectSocket = (socketIo: Socket) => {
  const savedSessionId = localStorage.getItem(SESSION_ID_LS_KEY);
  if (savedSessionId) {
    // eslint-disable-next-line no-param-reassign
    socketIo.auth = { sessionId: savedSessionId };
  }

  socketIo.connect();
  socketIo.on("connected", (data) => {
    const { sessionId } = connectedDataSchema.parse(data);
    // eslint-disable-next-line no-param-reassign
    socketIo.auth = { sessionId };
    localStorage.setItem(SESSION_ID_LS_KEY, sessionId);
  });
};

export const useWebSocketInit = () => {
  if (!SOCKET_IO_URL) throw new Error("Missing SOCKET_IO_URL env");

  const socketIo = io(SOCKET_IO_URL, { autoConnect: false });

  // Provides socket logs on client
  if (IS_DEV) {
    socketIo.onAny((event, ...args) => {
      // eslint-disable-next-line no-console
      console.log(event, args);
    });
    // eslint-disable-next-line no-console
    console.log("Socket created:", socketIo);
  }

  connectSocket(socketIo);

  useEffect(
    () => () => {
      socketIo.close();
    },
    [socketIo],
  );

  return {
    socketIo,
  };
};
