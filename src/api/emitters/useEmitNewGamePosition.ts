import { useCallback, useMemo } from "react";

import { useContextSocketIo } from "@/providers/SocketIo";

type EmitNewGamePositionArgs = {
  gameId: string;
  from: string;
  to: string;
};

export const useEmitNewGamePosition = () => {
  const socketIo = useContextSocketIo();

  const emit = useCallback(
    (args: EmitNewGamePositionArgs) => socketIo.emit("newGamePosition", args),
    [socketIo],
  );

  return useMemo(() => ({ emit }), [emit]);
};
