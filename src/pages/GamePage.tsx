import { Chess } from "chess.js";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useEmitEnterGameRoom } from "@/api/emitters/useEmitEnterGameRoom";
import { useEmitNewChatMessage } from "@/api/emitters/useEmitNewChatMessage";
import { useEmitNewGamePosition } from "@/api/emitters/useEmitNewGamePosition";
import { useEmitSurrender } from "@/api/emitters/useEmitSurrender";
import { useEmitUndoAnswer } from "@/api/emitters/useEmitUndoAnswer";
import { useEmitUndoAsk } from "@/api/emitters/useEmitUndoAsk";
import { useListenDefeat } from "@/api/listeners/useListenDefeat";
import { useListenDraw } from "@/api/listeners/useListenDraw";
import {
  EnterGameRoomResponse,
  useListenEnterGameRoom,
} from "@/api/listeners/useListenEnterGameRoom";
import {
  NewChatMessageResponse,
  useListenNewChatMessage,
} from "@/api/listeners/useListenNewChatMessage";
import {
  NewGamePositionResponse,
  useListenNewGamePosition,
} from "@/api/listeners/useListenNewGamePosition";
import { useListenUndoAsk } from "@/api/listeners/useListenUndoAsk";
import { useListenVictory } from "@/api/listeners/useListenVictory";
import { Chatbox } from "@/components/Chatbox";
import { GameChessboard } from "@/components/Chessboard";
import { GameFinishedDialog } from "@/components/GameFinishedDialog";
import { Spinner } from "@/components/Spinner";
import { ChatMessageType } from "@/models/ChatMessage";
import { GameDataType } from "@/models/GameData";
import { useContextDialog } from "@/providers/Dialog";

const DEFAULT_BUTTON_TEXT = "Copy link";

function OpponentMissingDialog() {
  const [buttonText, setButtonText] = useState(DEFAULT_BUTTON_TEXT);

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setButtonText("Copied!");
      setTimeout(() => setButtonText(DEFAULT_BUTTON_TEXT), 1000);
    } catch {
      setButtonText("Unable to copy...");
      setTimeout(() => setButtonText(DEFAULT_BUTTON_TEXT), 1000);
    }
  }, []);

  return (
    <div className="modal visible">
      <div className="modal-box">
        <h3 className="text-center text-lg font-bold">Opponent is missing</h3>
        <p>
          It seems that you don&apos;t have an opponent. Copy the link below to invite somebody!
        </p>
        <div className="modal-action justify-evenly">
          <button className="btn btn-primary" type="button" onClick={copyLink}>
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}

type UndoAskDialogProps = {
  onNo: () => void;
  onYes: () => void;
};

function UndoAskDialog({ onNo, onYes }: UndoAskDialogProps) {
  return (
    <div className="modal visible">
      <div className="modal-box">
        <h3 className="text-lg font-bold">Your opponent is asking to undo his last move</h3>
        <p className="py-4">Do you grant the undo?</p>
        <div className="modal-action justify-evenly">
          <button className="btn btn-primary" type="button" onClick={onNo}>
            No
          </button>
          <button className="btn btn-primary" type="button" onClick={onYes}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

export function PersonGamePage() {
  const { gameId } = useParams();
  if (!gameId) throw new Error("This shouldn't be matched by router");

  const { setDialog } = useContextDialog();

  const [game, setGame] = useState<Chess>(new Chess());
  const [side, setSide] = useState<GameDataType["side"]>();
  const [chatMessages, setChatMessages] = useState<ChatMessageType[]>([]);

  const handleEnterGameRoom = useCallback(
    ({
      gamePositionFen,
      side: newSide,
      chatMessages: newChatMessages,
      isOpponentMissing,
    }: EnterGameRoomResponse) => {
      setGame(new Chess(gamePositionFen));
      setSide(newSide);
      setChatMessages(newChatMessages);

      if (isOpponentMissing) {
        setDialog(<OpponentMissingDialog />);
      } else {
        setDialog(undefined);
      }
    },
    [setDialog],
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

  const emitterUndoAnswer = useEmitUndoAnswer();
  const handleUndoAsk = useCallback(() => {
    setDialog(
      <UndoAskDialog
        onNo={() => {
          emitterUndoAnswer.emit({ gameId, answer: false });
          setDialog(undefined);
        }}
        onYes={() => {
          emitterUndoAnswer.emit({ gameId, answer: true });
          setDialog(undefined);
        }}
      />,
    );
  }, [emitterUndoAnswer, gameId, setDialog]);
  useListenUndoAsk(handleUndoAsk);

  const handleNewChatMessage = useCallback((newChatMessage: NewChatMessageResponse) => {
    setChatMessages((prev) => [...prev, newChatMessage]);
  }, []);
  useListenNewChatMessage(handleNewChatMessage);

  const emitterEnterGameRoom = useEmitEnterGameRoom();
  useEffect(() => {
    emitterEnterGameRoom.emit({ gameId, gameType: "human" });
  }, [emitterEnterGameRoom, gameId]);

  const emitterNewGamePosition = useEmitNewGamePosition();

  const emitterSurrender = useEmitSurrender();

  const emitterUndoAsk = useEmitUndoAsk();

  const emitterNewChatMessage = useEmitNewChatMessage();

  if (!game || !side) return <Spinner />;

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <div className="flex grow flex-col gap-4 text-center">
        Playing against human opponent...
        <GameChessboard
          game={game}
          side={side}
          onMove={(from, to) => emitterNewGamePosition.emit({ gameId, from, to })}
          onSurrender={() => emitterSurrender.emit({ gameId })}
          onUndo={() => emitterUndoAsk.emit({ gameId })}
        />
      </div>
      <Chatbox
        chatMessages={chatMessages}
        onNewChatMessage={(newChatMessage) =>
          emitterNewChatMessage.emit({ gameId, newChatMessage })
        }
      />
    </div>
  );
}
