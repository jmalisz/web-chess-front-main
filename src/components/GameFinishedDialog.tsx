type GameFinishedDialogProps = {
  title: string;
  onOk: () => void;
};

export function GameFinishedDialog({ title, onOk }: GameFinishedDialogProps) {
  return (
    <div className="modal visible">
      <div className="modal-box max-w-xs">
        <h3 className="text-center text-lg font-bold">{title}</h3>
        <div className="modal-action justify-evenly">
          <button className="btn btn-primary" type="button" onClick={onOk}>
            Ok
          </button>
        </div>
      </div>
    </div>
  );
}
