export const appRouteConfig = {
  home: "/",
  personGame: "/game/person/:gameId",
  agentChoice: "/game/agent/choose",
  agentGame: "/game/agent/:agentName/:gameId",
} as const;
