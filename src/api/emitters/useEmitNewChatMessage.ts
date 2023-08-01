import { useCallback } from "react";

import { useContextSocketIo } from "@/providers/SocketIo";

type EmitNewChatMessageArgs = {
  gameId: string;
  newChatMessage: string;
};

export const useEmitNewChatMessage = () => {
  const socketIo = useContextSocketIo();

  const emit = useCallback(
    (args: EmitNewChatMessageArgs) => socketIo.emit("enterGameRoom", args),
    [socketIo],
  );

  return { emit };
};
