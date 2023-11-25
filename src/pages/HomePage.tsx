import { nanoid } from "nanoid";
import { generatePath, Link } from "react-router-dom";

import { appRouteConfig } from "@/routes/appRouteConfig";

export function HomePage() {
  const newGameId = nanoid();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="m-auto text-2xl">Would you want to play a game of chess?</h2>
      <div className="m-auto flex gap-4">
        <Link to={generatePath(appRouteConfig.personGame, { gameId: newGameId })}>
          <button className="btn btn-primary" type="button">
            Play with another person
          </button>
        </Link>
        <Link to={appRouteConfig.agentChoice}>
          <button className="btn btn-primary" type="button">
            Play with computer agent
          </button>
        </Link>
      </div>
    </div>
  );
}
