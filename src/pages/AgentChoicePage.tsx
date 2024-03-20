import { Link } from "react-router-dom";

import { AGENT_TYPES } from "@/constants";

export function AgentChoicePage() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="m-auto text-2xl">Choose agent type</h2>
      <p className="m-auto">
        Here you can pick your agent type. All agents will try their best to play on a level similar
        to yours. In general at lower levels of play chess is a game where both sides have equal
        chance to win. Agents should try to maintain the balance of the game, to help you learn.
      </p>
      <p>
        If you play well and increase the advantage, they will play better. On the other hand if you
        struggle, they will let you catch up.
      </p>
      <ul className="flex flex-col gap-4">
        {Object.values(AGENT_TYPES).map(({ getLink, agentName, description }) => (
          <li key={agentName}>
            <div className="flex items-center gap-2">
              <Link to={getLink()}>
                <button className="btn btn-primary m-auto w-32" type="button">
                  {agentName}
                </button>
              </Link>
              <p>{description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
