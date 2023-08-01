import { useCallback } from "react";

import { useContextSocketIo } from "@/providers/SocketIo";

type EmitEnterGameRoomArgs = {
  gameId: string;
};

export const useEmitEnterGameRoom = () => {
  const socketIo = useContextSocketIo();

  const emit = useCallback(
    (args: EmitEnterGameRoomArgs) => socketIo.emit("enterGameRoom", args),
    [socketIo],
  );

  return { emit };
};