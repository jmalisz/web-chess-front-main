import { z } from "zod";

import { useContextSocketIo } from "@/providers/SocketIo";

const responseSchema = z.object({
  gamePositionFen: z.string(),
});
export type NewGamePositionResponse = z.infer<typeof responseSchema>;

export const useListenNewGamePosition = (
  handler: (newGamePosition: NewGamePositionResponse) => void,
) => {
  const socketIo = useContextSocketIo();

  socketIo.on("newGamePosition", (data) => {
    const parsedNewGamePosition = responseSchema.parse(data);

    handler(parsedNewGamePosition);
  });
};
