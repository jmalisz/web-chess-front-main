export const appRouteConfig = {
  home: {
    absolutePath: "/",
    relativePath: "/",
  },
  game: {
    absolutePath: "/game/:gameId",
    relativePath: "game/:gameId",
  },
} as const;
