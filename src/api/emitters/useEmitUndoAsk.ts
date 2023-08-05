import { useCallback, useMemo } from "react";

import { useContextSocketIo } from "@/providers/SocketIo";

type EmitUndoAskArgs = {
  gameId: string;
};

export const useEmitUndoAsk = () => {
  const socketIo = useContextSocketIo();

  const emit = useCallback((args: EmitUndoAskArgs) => socketIo.emit("undoAsk", args), [socketIo]);

  return useMemo(() => ({ emit }), [emit]);
};
