const IST = "Asia/Kolkata";

export type TimeParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function splitMs(ms: number): TimeParts {
  const safe = Math.max(0, ms);
  const days = Math.floor(safe / 86_400_000);
  let rest = safe - days * 86_400_000;
  const hours = Math.floor(rest / 3_600_000);
  rest -= hours * 3_600_000;
  const minutes = Math.floor(rest / 60_000);
  rest -= minutes * 60_000;
  const seconds = Math.floor(rest / 1000);
  return { days, hours, minutes, seconds };
}

export function countdownTo(now: Date, targetIso: string): TimeParts & { done: boolean } {
  const ms = new Date(targetIso).getTime() - now.getTime();
  if (ms <= 0) return { done: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
  return { done: false, ...splitMs(ms) };
}

export function formatIndiaDate(iso: string) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: IST,
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

export function pad2(n: number) {
  return String(n).padStart(2, "0");
}
