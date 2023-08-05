import { useEffect } from "react";
import { z } from "zod";

import { ChatMessage } from "@/models/ChatMessage";
import { useContextSocketIo } from "@/providers/SocketIo";

const EVENT_NAME = "newChatMessage";

// Right now it's using the model directly, but in case the model changes, it should be mapped there
const responseSchema = ChatMessage;
export type NewChatMessageResponse = z.infer<typeof responseSchema>;

export const useListenNewChatMessage = (
  handler: (newChatMessage: NewChatMessageResponse) => void,
) => {
  const socketIo = useContextSocketIo();

  useEffect(() => {
    socketIo.on(EVENT_NAME, (data) => {
      const newChatMessage = responseSchema.parse(data);

      handler(newChatMessage);
    });

    return () => {
      socketIo.removeListener(EVENT_NAME);
    };
  }, [handler, socketIo]);
};
