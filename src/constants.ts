import { nanoid } from "nanoid";
import { generatePath } from "react-router-dom";

import { appRouteConfig } from "@/routes/appRouteConfig";

export const AGENT_TYPES = {
  stockfishEngineStrength: {
    getLink: () =>
      generatePath(appRouteConfig.agentGame, {
        agentName: "stockfishEngineStrength",
        gameId: nanoid(),
      }),
    agentName: "Stockfish-EngineStrength",
    description:
      "This agent uses a well known Stockfish chess engine to calculate the chance of winning and uses it to adjust its ELO for choosing positions.",
  },
  stockfishEvaluation: {
    getLink: () =>
      generatePath(appRouteConfig.agentGame, {
        agentName: "stockfishEvaluation",
        gameId: nanoid(),
      }),
    agentName: "Stockfish-Evaluation",
    description:
      "This agent also uses the Stockfish. It evaluates every possible move from current position and choses the one, that will closest to 70% chance of victory.",
  },
  neuralNetwork: {
    getLink: () =>
      generatePath(appRouteConfig.agentGame, {
        agentName: "neuralNetwork",
        gameId: nanoid(),
      }),
    agentName: "Neural network",
    description:
      "This agent uses a custom neural network that was trained on a large amount of human games of various ELO.",
  },
} as const;
