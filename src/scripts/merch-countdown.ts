// Shows "N days to go" on the Merch launch page (calendar days in the restaurant's time zone, America/Toronto).
const el = document.getElementById("teaser-count");
const launch = el?.dataset.launch; // YYYY-MM-DD

if (el && launch) {
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Toronto" }).format(new Date()); // YYYY-MM-DD
  const days = Math.round((Date.parse(launch + "T00:00:00Z") - Date.parse(today + "T00:00:00Z")) / 86400000);
  if (days > 1) el.textContent = `${days} days to go`;
  else if (days === 1) el.textContent = "Tomorrow!";
  else if (days === 0) el.textContent = "Launching today!";
  if (days >= 0) el.hidden = false;
}

export {};
