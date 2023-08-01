import { z } from "zod";

export const ChatMessage = z.object({
  id: z.string(),
  isYour: z.boolean(),
  content: z.string(),
});
export type ChatMessageType = z.infer<typeof ChatMessage>;
