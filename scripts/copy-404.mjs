import fs from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const source = path.join(projectRoot, "dist", "index.html");
const target = path.join(projectRoot, "dist", "404.html");

await fs.copyFile(source, target);
console.log("Archivo 404.html generado a partir de dist/index.html");
