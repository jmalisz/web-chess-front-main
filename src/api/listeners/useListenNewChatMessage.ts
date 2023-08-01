import { z } from "zod";

import { ChatMessage } from "@/models/ChatMessage";
import { useContextSocketIo } from "@/providers/SocketIo";

// Right now it's using the model directly, but in case the model changes, it should be mapped there
const responseSchema = z.object({
  chatMessage: ChatMessage,
});
export type NewChatMessageResponse = z.infer<typeof responseSchema>;

export const useListenNewChatMessage = (
  handler: (newChatMessage: NewChatMessageResponse) => void,
) => {
  const socketIo = useContextSocketIo();

  socketIo.on("newChatMessage", (data) => {
    const newChatMessage = responseSchema.parse(data);

    handler(newChatMessage);
  });
};
