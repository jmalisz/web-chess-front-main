import { useCallback, useMemo } from "react";

import { useContextSocketIo } from "@/providers/SocketIo";

type EmitSurrenderArgs = {
  gameId: string;
};

export const useEmitSurrender = () => {
  const socketIo = useContextSocketIo();

  const emit = useCallback(
    (args: EmitSurrenderArgs) => socketIo.emit("surrender", args),
    [socketIo],
  );

  return useMemo(() => ({ emit }), [emit]);
};
