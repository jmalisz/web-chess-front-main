import { nanoid } from "nanoid";
import { generatePath, Link } from "react-router-dom";

import { appRouteConfig } from "@/routes/appRouteConfig";

export function AgentChoicePage() {
  const newGameId = nanoid();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="m-auto text-2xl">Choose agent type</h2>
      <p className="m-auto">
        Here you can pick your agent type. All agents will try their best to play on a level similar
        to yours. In general at lower levels of play chess is a game where both sides have equal
        chance to win. Agents should try to maintain the balance of the game, with approximately 10%
        advantage for you.
      </p>
      <p>
        If you play well and increase the advantage, they will try to bring it back to 10%. On the
        other hand if you struggle, they will give you a chance.
      </p>
      <ul className="flex flex-col gap-4">
        <li>
          <div className="flex items-center gap-2">
            <Link
              to={generatePath(appRouteConfig.agentGame, {
                agentName: "stockfish",
                gameId: newGameId,
              })}
            >
              <button className="btn btn-primary m-auto w-32" type="button">
                Stockfish
              </button>
            </Link>
            <p>
              This agent uses a well known Stockfish chess engine for both advantage estimation and
              calculating moves.
            </p>
          </div>
        </li>
        <li>
          <div className="flex items-center gap-2">
            <Link
              to={generatePath(appRouteConfig.agentGame, {
                agentName: "hybrid",
                gameId: newGameId,
              })}
            >
              <button className="btn btn-primary m-auto w-32" type="button">
                Hybrid
              </button>
            </Link>
            <p>
              This agent also uses the Stockfish chess engine for advantage estimation, but moves
              are calculated by a custom neural network.
            </p>
          </div>
        </li>
        <li>
          <div className="flex items-center gap-2">
            <Link
              to={generatePath(appRouteConfig.agentGame, {
                agentName: "neural-network",
                gameId: newGameId,
              })}
            >
              <button className="btn btn-primary m-auto w-32" type="button">
                Neural network
              </button>
            </Link>
            <p>Both advantage and next moves are calculated by custom neural network.</p>
          </div>
        </li>
      </ul>
    </div>
  );
}
