export function Spinner() {
  return (
    <div className="m-auto flex">
      <div
        className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent"
        role="status"
      >
        <span className="hidden">Loading...</span>
      </div>
    </div>
  );
}
