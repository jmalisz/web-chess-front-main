import { Outlet } from "react-router-dom";

import { ApiErrorDisplay } from "@/components/ApiErrorDisplay";

export function AppSideEffects() {
  return (
    <>
      <ApiErrorDisplay />
      <Outlet />
    </>
  );
}
