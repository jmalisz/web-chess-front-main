import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { MainLayout } from "@/layouts/MainLayout";
import { AgentChoicePage } from "@/pages/AgentChoicePage";
import { AgentGamePage } from "@/pages/AgentGamePage";
import { PersonGamePage } from "@/pages/GamePage";
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
                path: appRouteConfig.home,
                element: <HomePage />,
              },
              {
                path: appRouteConfig.personGame,
                element: <PersonGamePage />,
              },
              {
                path: appRouteConfig.agentChoice,
                element: <AgentChoicePage />,
              },
              {
                path: appRouteConfig.agentGame,
                element: <AgentGamePage />,
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
