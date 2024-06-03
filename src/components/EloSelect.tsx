import React from "react";

const ELO_OPTIONS = Array.from({ length: 10 }).map((_, index) => 800 + 200 * index);

export function EloSelectWithRef(_: unknown, ref: React.Ref<HTMLSelectElement>) {
  return (
    <label className="form-control w-full max-w-xs" htmlFor="elo-select">
      <div className="label">
        <span className="label-text">Select simulated ELO</span>
      </div>
      <select ref={ref} className="select select-bordered" defaultValue={1200} id="elo-select">
        {ELO_OPTIONS.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

export const EloSelect = React.forwardRef(EloSelectWithRef);
