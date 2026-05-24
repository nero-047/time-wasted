"use client";

import { useEffect, useMemo, useState } from "react";

type ElapsedTime = {
  years: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const BIRTH_YEAR = 2002;
const BIRTH_MONTH_INDEX = 9;
const BIRTH_DAY = 31;
const BIRTH_HOUR_UTC = 10;
const BIRTH_MINUTE_UTC = 15;
const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

function birthTimeForYear(year: number) {
  return Date.UTC(
    year,
    BIRTH_MONTH_INDEX,
    BIRTH_DAY,
    BIRTH_HOUR_UTC,
    BIRTH_MINUTE_UTC,
    0,
  );
}

function getElapsed(nowMs: number): ElapsedTime {
  const now = new Date(nowMs);
  let years = now.getUTCFullYear() - BIRTH_YEAR;
  let lastAnniversary = birthTimeForYear(BIRTH_YEAR + years);

  if (nowMs < lastAnniversary) {
    years -= 1;
    lastAnniversary = birthTimeForYear(BIRTH_YEAR + years);
  }

  let remaining = Math.max(0, nowMs - lastAnniversary);
  const days = Math.floor(remaining / DAY);
  remaining %= DAY;
  const hours = Math.floor(remaining / HOUR);
  remaining %= HOUR;
  const minutes = Math.floor(remaining / MINUTE);
  remaining %= MINUTE;
  const seconds = Math.floor(remaining / SECOND);

  return { years, days, hours, minutes, seconds };
}

function formatValue(value: number, width: number) {
  return value.toString().padStart(width, "0");
}

function formatReadout(elapsed: ElapsedTime | null) {
  if (!elapsed) {
    return "--:---:--:--:--";
  }

  return [
    formatValue(elapsed.years, 2),
    formatValue(elapsed.days, 3),
    formatValue(elapsed.hours, 2),
    formatValue(elapsed.minutes, 2),
    formatValue(elapsed.seconds, 2),
  ].join(":");
}

export default function TimeWastedCounter() {
  const [nowMs, setNowMs] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setNowMs(Date.now());

    tick();
    const timer = window.setInterval(tick, SECOND);

    return () => window.clearInterval(timer);
  }, []);

  const elapsed = useMemo(() => (nowMs ? getElapsed(nowMs) : null), [nowMs]);
  const readout = formatReadout(elapsed);

  return (
    <div className="flex w-full flex-1 items-center justify-center pb-12 pt-4 max-[380px]:pb-8 max-[380px]:pt-2 sm:pb-16 sm:pt-6 lg:pb-20">
      <p className="sr-only" aria-live="off">
        {elapsed
          ? `${elapsed.years} years, ${elapsed.days} days, ${elapsed.hours} hours, ${elapsed.minutes} minutes, and ${elapsed.seconds} seconds since 31 October 2002 at 3:45 PM India time.`
          : "Elapsed time since 31 October 2002 at 3:45 PM India time."}
      </p>
      <div
        className="time-readout select-none whitespace-nowrap text-center font-mono text-[2.08rem] font-semibold leading-none tracking-normal text-foreground max-[380px]:text-[1.78rem] min-[390px]:text-[2.35rem] sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[10rem] min-[2200px]:text-[13rem]"
        aria-hidden="true"
      >
        {readout}
      </div>
    </div>
  );
}
