"use client";

import { toggleFullscreen } from "./fullscreen-shortcut";

export default function FullscreenDateToggle() {
  return (
    <button
      className="select-none border border-foreground/15 bg-foreground/[0.025] px-4 py-2 font-mono text-xs font-medium uppercase tracking-normal opacity-55 shadow-[0_0_56px_rgba(127,127,127,0.08)] transition hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground max-[380px]:px-3 max-[380px]:py-1 max-[380px]:text-[10px] sm:text-sm 2xl:px-5 2xl:py-3 2xl:text-base min-[2200px]:text-lg"
      onClick={() => void toggleFullscreen()}
      type="button"
    >
      31.10.2002 / 15:45
    </button>
  );
}
