import { useCallback, useMemo } from "react";

import { useContextSocketIo } from "@/providers/SocketIo";

type EmitEnterGameRoomArgs = {
  gameId: string;
  gameType: "human" | "stockfishEngineStrength" | "stockfishEvaluation" | "neuralNetwork";
};

export const useEmitEnterGameRoom = () => {
  const socketIo = useContextSocketIo();

  const emit = useCallback(
    (args: EmitEnterGameRoomArgs) => socketIo.emit("enterGameRoom", args),
    [socketIo],
  );

  return useMemo(() => ({ emit }), [emit]);
};
