import { toast } from "react-toastify";

import { useListenError } from "@/api/listeners/useListenError";

export function ApiErrorDisplay() {
  useListenError((requestError) => {
    const errorMessage = requestError.errors.at(-1)?.message;

    if (!errorMessage) return;

    toast.error(errorMessage);
  });

  return null;
}
