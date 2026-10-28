"use client";

import { useEffect, useState } from "react";

const format = () =>
  new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Africa/Casablanca",
  }).format(new Date());

/** Live time in Rabat, so international visitors see the time difference at a glance. */
export default function LocalTime() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const tick = () => setTime(format());
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);
  return (
    <span style={{ fontVariantNumeric: "tabular-nums" }}>Rabat {time ?? "--:--"}</span>
  );
}
