import { useEffect } from "react";
import { z } from "zod";

import { useContextSocketIo } from "@/providers/SocketIo";

const EVENT_NAME = "newGamePosition";

const responseSchema = z.object({
  gamePositionFen: z.string(),
});
export type NewGamePositionResponse = z.infer<typeof responseSchema>;

export const useListenNewGamePosition = (
  handler: (newGamePosition: NewGamePositionResponse) => void,
) => {
  const socketIo = useContextSocketIo();

  useEffect(() => {
    socketIo.on(EVENT_NAME, (data) => {
      const parsedNewGamePosition = responseSchema.parse(data);

      handler(parsedNewGamePosition);
    });

    return () => {
      socketIo.removeListener(EVENT_NAME);
    };
  }, [handler, socketIo]);
};
