import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { MainLayout } from "@/layouts/MainLayout";
import { GamePage } from "@/pages/GamePage";
import { HomePage } from "@/pages/HomePage";
import { AppContextProviders } from "@/routes/AppContextProviders";
import { appRouteConfig } from "@/routes/appRouteConfig";
import { AppSideEffects } from "@/routes/AppSideEffects";

const router = createBrowserRouter([
  {
    element: <AppContextProviders />,
    children: [
      {
        element: <AppSideEffects />,
        children: [
          {
            element: <MainLayout />,
            children: [
              {
                path: appRouteConfig.home.relativePath,
                element: <HomePage />,
              },
              {
                path: appRouteConfig.game.relativePath,
                element: <GamePage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
