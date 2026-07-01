import FullscreenShortcut from "./fullscreen-shortcut";
import FullscreenDateToggle from "./fullscreen-date-toggle";
import TimeWastedCounter from "./time-wasted-counter";

export default function Home() {
  return (
    <main className="min-h-dvh overflow-hidden bg-background text-foreground">
      <FullscreenShortcut />
      <section className="relative flex min-h-dvh flex-col items-center justify-between px-5 py-6 max-[380px]:py-4 sm:px-8 sm:py-9 lg:px-12 lg:py-10">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-foreground/15" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-foreground/10" />

        <header className="flex w-full items-center justify-center">
          <h1 className="select-none text-center font-mono text-xl font-semibold uppercase leading-none tracking-normal opacity-65 max-[380px]:text-lg sm:text-3xl lg:text-4xl 2xl:text-5xl min-[2200px]:text-6xl">
            Time Wasted
          </h1>
        </header>

        <TimeWastedCounter />

        <footer className="flex w-full items-center justify-center">
          <FullscreenDateToggle />
        </footer>
      </section>
    </main>
  );
}
