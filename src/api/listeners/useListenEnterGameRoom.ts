import { useEffect } from "react";
import { z } from "zod";

import { GameData } from "@/models/GameData";
import { useContextSocketIo } from "@/providers/SocketIo";

const EVENT_NAME = "enterGameRoom";

// Right now it's the same, but in case it changes, it should be mapped to GameData model there
const responseSchema = GameData;
export type EnterGameRoomResponse = z.infer<typeof responseSchema>;

export const useListenEnterGameRoom = (
  handler: (enterGameRoomResponse: EnterGameRoomResponse) => void,
) => {
  const socketIo = useContextSocketIo();

  useEffect(() => {
    socketIo.on(EVENT_NAME, (data) => {
      const parsedResponse = responseSchema.parse(data);

      handler(parsedResponse);
    });

    return () => {
      socketIo.removeListener(EVENT_NAME);
    };
  }, [handler, socketIo]);
};
