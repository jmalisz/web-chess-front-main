import { Chess } from "chess.js";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { z } from "zod";

import { useEmitEnterGameRoom } from "@/api/emitters/useEmitEnterGameRoom";
import { useEmitNewGamePosition } from "@/api/emitters/useEmitNewGamePosition";
import { useEmitSurrender } from "@/api/emitters/useEmitSurrender";
import { useEmitUndoAsk } from "@/api/emitters/useEmitUndoAsk";
import { useListenDefeat } from "@/api/listeners/useListenDefeat";
import { useListenDraw } from "@/api/listeners/useListenDraw";
import {
  EnterGameRoomResponse,
  useListenEnterGameRoom,
} from "@/api/listeners/useListenEnterGameRoom";
import {
  NewGamePositionResponse,
  useListenNewGamePosition,
} from "@/api/listeners/useListenNewGamePosition";
import { useListenVictory } from "@/api/listeners/useListenVictory";
import { GameChessboard } from "@/components/Chessboard";
import { GameFinishedDialog } from "@/components/GameFinishedDialog";
import { Spinner } from "@/components/Spinner";
import { GameDataType } from "@/models/GameData";
import { useContextDialog } from "@/providers/Dialog";

const paramsSchema = z.object({
  agentName: z.enum(["stockfish", "hybrid", "neural-network"]),
  gameId: z.string(),
});

export function AgentGamePage() {
  const { agentName, gameId } = paramsSchema.parse(useParams());

  const { setDialog } = useContextDialog();

  const [game, setGame] = useState<Chess>(new Chess());
  const [side, setSide] = useState<GameDataType["side"]>();

  const handleEnterGameRoom = useCallback(
    ({ gamePositionFen, side: newSide }: EnterGameRoomResponse) => {
      setGame(new Chess(gamePositionFen));
      setSide(newSide);
    },
    [],
  );
  useListenEnterGameRoom(handleEnterGameRoom);

  const handleNewGamePosition = useCallback(({ gamePositionFen }: NewGamePositionResponse) => {
    setGame(new Chess(gamePositionFen));
  }, []);
  useListenNewGamePosition(handleNewGamePosition);

  const handleVictory = useCallback(() => {
    setDialog(<GameFinishedDialog title="You won!" onOk={() => setDialog(undefined)} />);
  }, [setDialog]);
  useListenVictory(handleVictory);

  const handleDefeat = useCallback(() => {
    setDialog(<GameFinishedDialog title="You lost!" onOk={() => setDialog(undefined)} />);
  }, [setDialog]);
  useListenDefeat(handleDefeat);

  const handleDraw = useCallback(() => {
    setDialog(<GameFinishedDialog title="A draw!" onOk={() => setDialog(undefined)} />);
  }, [setDialog]);
  useListenDraw(handleDraw);

  const emitterEnterGameRoom = useEmitEnterGameRoom();
  useEffect(() => {
    emitterEnterGameRoom.emit({ gameId, gameType: agentName });
  }, [agentName, emitterEnterGameRoom, gameId]);

  const emitterNewGamePosition = useEmitNewGamePosition();

  const emitterSurrender = useEmitSurrender();

  const emitterUndoAsk = useEmitUndoAsk();

  if (!game || !side) return <Spinner />;

  return (
    <div className="flex grow flex-col gap-4 text-center">
      Playing against {agentName} agent...
      <GameChessboard
        checkUndoSide={false}
        game={game}
        side={side}
        showGoBack
        onMove={(from, to) => emitterNewGamePosition.emit({ gameId, from, to })}
        onSurrender={() => emitterSurrender.emit({ gameId })}
        onUndo={() => emitterUndoAsk.emit({ gameId })}
      />
    </div>
  );
}
