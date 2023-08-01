import type { PropsWithChildren, ReactElement } from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

type DialogContextType = {
  dialog: ReactElement | undefined;
  setDialog: React.Dispatch<React.SetStateAction<ReactElement | undefined>>;
};

const ContextDialog = createContext<DialogContextType>({ dialog: undefined, setDialog: () => {} });

export function ContextProviderDialog({ children }: PropsWithChildren) {
  const location = useLocation();

  const [dialog, setDialog] = useState<ReactElement>();

  const dialogValue = useMemo(() => ({ dialog, setDialog }), [dialog]);

  // Remove dialogs when changing pages
  useEffect(() => {
    setDialog(undefined);
  }, [location.pathname]);

  return (
    <ContextDialog.Provider value={dialogValue}>
      {dialog}
      {children}
    </ContextDialog.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useContextDialog() {
  const context = useContext(ContextDialog);

  if (!context) throw new Error("useDialogContext must be used within DialogContextProvider");

  return context;
}
