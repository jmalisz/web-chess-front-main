import { nanoid } from "nanoid";
import { Link } from "react-router-dom";

const newGameId = nanoid();

export function HomePage() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="m-auto text-2xl">Would you want to play a game of chess?</h2>
      <div className="m-auto flex gap-4">
        <Link to={`/game/${newGameId}`}>
          <button className="btn btn-primary" type="button">
            Play with another person
          </button>
        </Link>
        <div className="tooltip tooltip-info tooltip-bottom" data-tip="Not implemented :(">
          <button className="btn btn-primary" type="button" disabled>
            Play with computer
          </button>
        </div>
      </div>
    </div>
  );
}
