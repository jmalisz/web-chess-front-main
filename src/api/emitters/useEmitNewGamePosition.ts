import { useCallback } from "react";

import { useContextSocketIo } from "@/providers/SocketIo";

type EmitNewGamePositionArgs = {
  gameId: string;
  from: string;
  to: string;
};

export const useEmitNewGamePosition = () => {
  const socketIo = useContextSocketIo();

  const emit = useCallback(
    (args: EmitNewGamePositionArgs) => socketIo.emit("enterGameRoom", args),
    [socketIo],
  );

  return { emit };
};
