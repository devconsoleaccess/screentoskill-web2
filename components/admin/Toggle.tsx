"use client";

import React from "react";

/** Small accessible on/off switch used across the admin reward pages. */
export function Toggle({
  checked,
  onChange,
  disabled,
  size = "md",
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
  size?: "sm" | "md";
}) {
  const dims = size === "sm"
    ? { track: "h-5 w-9", knob: "h-3.5 w-3.5", on: "translate-x-4", off: "translate-x-1" }
    : { track: "h-6 w-11", knob: "h-4 w-4", on: "translate-x-6", off: "translate-x-1" };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex ${dims.track} shrink-0 items-center rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
        checked ? "bg-[var(--color-brand)]" : "bg-slate-300 dark:bg-slate-700"
      }`}
    >
      <span className={`inline-block ${dims.knob} transform rounded-full bg-white transition-transform ${checked ? dims.on : dims.off}`} />
    </button>
  );
}
