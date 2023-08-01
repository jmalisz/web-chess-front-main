import { useCallback } from "react";
import { Link, Outlet } from "react-router-dom";

import { useListenDisconnect } from "@/api/listeners/useListenDisconnect";
import { useContextDialog } from "@/providers/Dialog";
import { useContextSocketIo } from "@/providers/SocketIo";

type DisconnectedDialogProps = {
  onGoToHome: () => void;
};

function DisconnectedDialog({ onGoToHome }: DisconnectedDialogProps) {
  return (
    <div className="modal visible">
      <div className="modal-box">
        <h3 className="text-center text-lg font-bold">Disconnected</h3>
        <p className="mb-4">
          It seems that you have been disconnected. This may occur on server error or if you try to
          join a game session that is already in progress.
        </p>
        <p>If this error persists try reloading the webpage or go to homepage.</p>
        <div className="modal-action justify-evenly">
          <Link to="/">
            <button className="btn btn-primary" type="button" onClick={onGoToHome}>
              Go to homepage
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export function MainLayout() {
  const socketIo = useContextSocketIo();
  const { setDialog } = useContextDialog();

  const handleDisconnect = useCallback(() => {
    setDialog(<DisconnectedDialog onGoToHome={() => socketIo.connect()} />);
  }, [setDialog, socketIo]);
  useListenDisconnect(handleDisconnect);

  return (
    <div className="flex h-screen flex-col items-center">
      <header className="sticky top-0 z-10 hidden w-full border-b border-b-gray-200 bg-base-100 md:block">
        <div className="m-auto max-w-5xl p-4">
          <Link to="/">
            <h1 className="text-center text-3xl text-primary focus:text-primary-focus lg:text-left">
              Web-Chess
            </h1>
          </Link>
        </div>
      </header>
      <div className="w-full max-w-5xl flex-grow justify-center p-4">
        <Outlet />
      </div>
      <footer className="flex max-w-5xl flex-col justify-center p-4 ">
        <Link className="md:hidden" to="/">
          <h1 className="text-center text-3xl text-primary focus:text-primary-focus lg:text-left">
            Web-Chess
          </h1>
        </Link>
        <span className="opacity-20">Made by Jakub Maliszewski</span>
      </footer>
    </div>
  );
}
