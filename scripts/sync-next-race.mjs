import fs from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const outputPath = path.join(projectRoot, "src", "data", "next-race.json");
const upcomingEventsPath = path.join(projectRoot, "src", "data", "upcoming-events.json");
const calendarId =
  "2e83e34d1a6a1175e764fd8f0adcbfdb471ab4227e598541051f71547e1ca555@group.calendar.google.com";
const calendarUrl = `https://calendar.google.com/calendar/ical/${calendarId}/public/basic.ics`;

function unfoldIcs(content) {
  return content.replace(/\r?\n[ \t]/g, "");
}

function parseIcsDate(value) {
  if (!value) return null;

  if (/^\d{8}$/.test(value)) {
    const year = Number(value.slice(0, 4));
    const month = Number(value.slice(4, 6));
    const day = Number(value.slice(6, 8));
    return new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
  }

  const normalized = value.endsWith("Z") ? value : `${value}Z`;
  const match = normalized.match(
    /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z$/
  );

  if (!match) return null;

  const [, year, month, day, hour, minute, second] = match;
  return new Date(
    Date.UTC(
      Number(year),
      Number(month) - 1,
      Number(day),
      Number(hour),
      Number(minute),
      Number(second)
    )
  );
}

function getField(block, fieldName) {
  const line = block
    .split(/\r?\n/)
    .find((entry) => entry.startsWith(`${fieldName}:`) || entry.startsWith(`${fieldName};`));

  if (!line) return null;

  const separatorIndex = line.indexOf(":");
  return separatorIndex === -1 ? null : line.slice(separatorIndex + 1).trim();
}

function decodeText(value) {
  if (!value) return "";

  return value
    .replace(/\\,/g, ",")
    .replace(/\\;/g, ";")
    .replace(/\\n/g, " ")
    .replace(/\\\\/g, "\\")
    .trim();
}

async function main() {
  const response = await fetch(calendarUrl);

  if (!response.ok) {
    throw new Error(`Google Calendar ${response.status}: no se pudo descargar el calendario`);
  }

  const rawCalendar = unfoldIcs(await response.text());
  const now = new Date();

  const events = rawCalendar
    .split("BEGIN:VEVENT")
    .slice(1)
    .map((chunk) => {
      const block = chunk.split("END:VEVENT")[0] ?? "";
      const start = parseIcsDate(getField(block, "DTSTART"));
      const summary = decodeText(getField(block, "SUMMARY"));

      return {
        title: summary,
        date: start,
      };
    })
    .filter((event) => event.title && event.date && event.date >= now)
    .sort((left, right) => left.date - right.date);

  const nextRace = events[0] ?? null;
  const upcomingEvents = events.slice(0, 8).map((event) => ({
    title: event.title,
    date: event.date.toISOString(),
  }));

  const output = nextRace
    ? {
        title: nextRace.title,
        date: nextRace.date.toISOString(),
      }
    : {
        title: "Próxima carrera por confirmar",
        date: null,
      };

  await fs.writeFile(outputPath, `${JSON.stringify(output, null, 2)}\n`, "utf8");
  await fs.writeFile(upcomingEventsPath, `${JSON.stringify(upcomingEvents, null, 2)}\n`, "utf8");
  console.log("Proxima carrera sincronizada en src/data/next-race.json");
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
