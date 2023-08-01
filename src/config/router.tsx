import { createBrowserRouter } from "react-router-dom";

import { MainLayout } from "@/layouts/MainLayout";
import { GamePage } from "@/pages/GamePage";
import { HomePage } from "@/pages/HomePage";
import { ContextProviders } from "@/providers/ContextProviders";

export const routeConfig = {
  home: {
    absolutePath: "/",
    relativePath: "/",
  },
  game: {
    absolutePath: "/game",
    relativePath: "game",
  },
};

export const router = createBrowserRouter([
  {
    element: <ContextProviders />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: routeConfig.home.relativePath,
            element: <HomePage />,
          },
          {
            path: routeConfig.game.relativePath,
            element: <GamePage />,
          },
        ],
      },
    ],
  },
]);
