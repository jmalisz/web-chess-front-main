import type { Chess, Square } from "chess.js";
import { useCallback, useMemo, useState } from "react";
import { Chessboard } from "react-chessboard";
import { useNavigate } from "react-router-dom";

type PossibleMovesType = Record<string, { background?: string; borderRadius?: string }>;

type GameChessboardProps = {
  game: Chess;
  side: "white" | "black";
  checkUndoSide?: boolean;
  showGoBack?: boolean;
  onMove: (from: string, to: string) => void;
  onSurrender: () => void;
  onUndo: () => void;
};

export function GameChessboard({
  game,
  side,
  checkUndoSide = true,
  showGoBack,
  onMove,
  onSurrender,
  onUndo,
}: GameChessboardProps) {
  const [moveFrom, setMoveFrom] = useState("");
  const [possibleMoves, setPossibleMoves] = useState<PossibleMovesType>();

  const deselectPiece = useCallback(() => {
    setMoveFrom("");
    setPossibleMoves(undefined);
  }, []);

  const onSquareClick = useCallback(
    (square: Square) => {
      function getPossibleMoves(selectedPiece: Square) {
        const moves = game.moves({
          square: selectedPiece,
          verbose: true,
        });
        if (moves.length === 0) {
          return;
        }

        // Mark squares where selectedPiece can move
        const newPossibleMoves: PossibleMovesType = Object.fromEntries(
          moves.map(({ to, captured, promotion }) => [
            to,
            {
              background:
                captured || promotion
                  ? "radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)"
                  : "radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)",
              borderRadius: "50%",
            },
          ]),
        );
        // Mark the selected piece
        newPossibleMoves[square] = {
          background: "rgba(255, 255, 0, 0.4)",
        };

        return newPossibleMoves;
      }

      if (square === moveFrom) {
        deselectPiece();

        return;
      }

      const squareInformation = game.get(square);
      if (squareInformation.color === side[0]) {
        setMoveFrom(square);
        setPossibleMoves(getPossibleMoves(square));

        return;
      }

      // Deselect piece on clicking empty square that isn't a possible move
      if (!possibleMoves?.[square]) {
        deselectPiece();

        return;
      }

      // Perform a move
      onMove(moveFrom, square);
      setMoveFrom("");
      setPossibleMoves(undefined);
    },
    [moveFrom, game, side, possibleMoves, onMove, deselectPiece],
  );

  const getGameHeader = useMemo(() => {
    if (game.isCheck()) return game.turn() === "w" ? "White in check!" : "Black in check!";

    return game.turn() === "w" ? "Your turn" : "Opponent turn";
  }, [game]);

  const navigate = useNavigate();

  // A lot of things are rerendered when new game prop will arrive
  return (
    <div className="flex grow flex-col gap-4">
      <div className="text-center">{getGameHeader}</div>
      <div className="m-auto my-0 w-[70%] max-w-[70vh] md:w-full">
        <Chessboard
          arePiecesDraggable={false}
          boardOrientation={side}
          customSquareStyles={possibleMoves}
          position={game.fen()}
          customBoardStyle={{
            borderRadius: "4px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
            marginBottom: 16,
          }}
          onSquareClick={onSquareClick}
        />
        <div className="flex justify-center gap-2 md:justify-start">
          <button
            className="btn btn-outline"
            type="button"
            onClick={() => {
              deselectPiece();
              onSurrender();
            }}
          >
            Surrender
          </button>
          <button
            className="btn btn-outline"
            disabled={(checkUndoSide && game.turn() === side[0]) || game.pgn().length === 0}
            type="button"
            onClick={() => {
              deselectPiece();
              onUndo();
            }}
          >
            Undo
          </button>
          {showGoBack ? (
            <button
              className="btn btn-secondary ml-auto"
              type="button"
              onClick={() => navigate(-1)}
            >
              Go back
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
