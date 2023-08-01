import { useCallback } from "react";

import { useContextSocketIo } from "@/providers/SocketIo";

type EmitUndoAskArgs = {
  gameId: string;
};

export const useEmitUndoAsk = () => {
  const socketIo = useContextSocketIo();

  const emit = useCallback(
    (args: EmitUndoAskArgs) => socketIo.emit("enterGameRoom", args),
    [socketIo],
  );

  return { emit };
};
