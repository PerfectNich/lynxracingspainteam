import fs from "node:fs";
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { randomUUID } from "node:crypto";
import { validateResults } from "./validate-results.mjs";

const file = new URL("../src/data/race-results.json", import.meta.url);
const results = JSON.parse(fs.readFileSync(file, "utf8"));
const members = JSON.parse(fs.readFileSync(new URL("../src/data/members.json", import.meta.url), "utf8"));
const roster = [...members.management, ...members.drivers];
const cars = fs.readdirSync(new URL("../public/marcas/", import.meta.url)).filter((name) => name.endsWith(".svg")).map((name) => name.slice(0, -4));
const input = createInterface({ input: stdin, output: stdout });
try {
  const event = (await input.question("Nombre de la carrera: ")).trim();
  const year = Number(await input.question("Ano: "));
  const simulator = (await input.question("Simulador (iRacing, ACC...): ")).trim();
  const car = (await input.question(`Coche (${cars.join(", ")}): `)).trim().toLowerCase();
  const pos = Number(await input.question("Posicion final: "));
  roster.forEach((member, index) => console.log(`${index + 1}. ${member.name}`));
  const selected = (await input.question("Numeros de los pilotos separados por comas: ")).split(",").map((value) => Number(value.trim()));
  if (!selected.length || selected.some((value) => !Number.isInteger(value) || value < 1 || value > roster.length)) throw new Error("Seleccion de pilotos no valida");
  const featured = (await input.question("Destacar en inicio? (s/n): ")).trim().toLowerCase() === "s";
  const next = [...results.map((result) => featured ? { ...result, featured: false } : result),
    { id: randomUUID(), event, year, simulator, car, pos, drivers: selected.map((value) => roster[value - 1].name), featured }];
  const errors = validateResults(next, cars);
  if (errors.length) throw new Error(errors.join("\n"));
  fs.writeFileSync(file, JSON.stringify(next, null, 2) + "\n");
  console.log("Resultado guardado en local. Aparecera en palmares, historial y fichas al publicar.");
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
} finally {
  input.close();
}
