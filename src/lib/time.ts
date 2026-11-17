const IST = "Asia/Kolkata";

export type TimeParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export type Together = TimeParts & { years: number; months: number };

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function istWall(date: Date) {
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: IST,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  });
  const bag: Record<string, string> = {};
  for (const part of fmt.formatToParts(date)) {
    if (part.type !== "literal") bag[part.type] = part.value;
  }
  let hour = Number(bag.hour);
  if (hour === 24) hour = 0;
  return {
    year: Number(bag.year),
    month: Number(bag.month),
    day: Number(bag.day),
    hour,
    minute: Number(bag.minute),
    second: Number(bag.second),
  };
}

function wallToInstant(y: number, m: number, d: number, hh: number, mm: number, ss: number) {
  return new Date(`${y}-${pad(m)}-${pad(d)}T${pad(hh)}:${pad(mm)}:${pad(ss)}+05:30`);
}

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

/** Full years and months in India time, then the leftover days and clock. */
export function timeTogether(now: Date, startIso: string): Together {
  const start = new Date(startIso);
  const s = istWall(start);
  let years = istWall(now).year - s.year;
  let anniversary = wallToInstant(s.year + years, s.month, s.day, s.hour, s.minute, s.second);
  if (now.getTime() < anniversary.getTime()) {
    years -= 1;
    anniversary = wallToInstant(s.year + years, s.month, s.day, s.hour, s.minute, s.second);
  }
  if (years < 0) years = 0;

  const anchor = istWall(anniversary);
  let cursorYear = anchor.year;
  let cursorMonth = anchor.month;
  let months = 0;
  for (let guard = 0; guard < 12; guard += 1) {
    let nextMonth = cursorMonth + 1;
    let nextYear = cursorYear;
    if (nextMonth > 12) {
      nextMonth = 1;
      nextYear += 1;
    }
    const next = wallToInstant(nextYear, nextMonth, s.day, s.hour, s.minute, s.second);
    if (now.getTime() < next.getTime()) break;
    months += 1;
    cursorMonth = nextMonth;
    cursorYear = nextYear;
  }
  const monthStart = wallToInstant(cursorYear, cursorMonth, s.day, s.hour, s.minute, s.second);
  const parts = splitMs(now.getTime() - monthStart.getTime());
  return { years, months, ...parts };
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
