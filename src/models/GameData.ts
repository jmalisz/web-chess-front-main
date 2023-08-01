import { z } from "zod";

import { ChatMessage } from "@/models/ChatMessage";

export const GameData = z.object({
  gamePositionFen: z.string(),
  side: z.enum(["white", "black"]),
  isOpponentMissing: z.boolean(),
  chatMessages: z.array(ChatMessage),
});
export type GameDataType = z.infer<typeof GameData>;
