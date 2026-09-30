// src/scripts/hours-badge.ts
// Computes "Open now" / "Closed now" client-side in the restaurant's own timezone
// (America/Toronto), using the badge's data-* attributes set from src/data/site.ts.
// Done client-side because a server-rendered static page has no reliable notion
// of the visitor's "now" without this.

function getPartsInTZ(tz: string) {
  const now = new Date();
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    weekday: "short",
  });
  const parts = fmt.formatToParts(now);
  const map: Record<string, string> = {};
  parts.forEach((p) => (map[p.type] = p.value));

  const weekdayMap: Record<string, number> = {
    Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6,
  };

  return {
    day: weekdayMap[map.weekday],
    minutes: parseInt(map.hour, 10) * 60 + parseInt(map.minute, 10),
  };
}

function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

const badge = document.getElementById("hours-badge");

if (badge) {
  const tz = badge.dataset.timezone || "America/Toronto";
  const openStr = badge.dataset.open || "12:00";
  const closeStr = badge.dataset.close || "19:00";
  const closedDays = (badge.dataset.closedDays || "")
    .split(",")
    .filter(Boolean)
    .map(Number);

  const { day, minutes } = getPartsInTZ(tz);
  const openMin = toMinutes(openStr);
  const closeMin = toMinutes(closeStr);
  const isClosedDay = closedDays.includes(day);
  const isOpen = !isClosedDay && minutes >= openMin && minutes < closeMin;

  badge.textContent = isOpen ? "Open now" : "Closed now";
  badge.dataset.state = isOpen ? "open" : "closed";
}

export {};
