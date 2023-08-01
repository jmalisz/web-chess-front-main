import { useCallback } from "react";

import { useContextSocketIo } from "@/providers/SocketIo";

type EmitUndoAnswerArgs = {
  gameId: string;
  answer: boolean;
};

export const useEmitUndoAnswer = () => {
  const socketIo = useContextSocketIo();

  const emit = useCallback(
    (args: EmitUndoAnswerArgs) => socketIo.emit("undoAnswer", args),
    [socketIo],
  );

  return { emit };
};
