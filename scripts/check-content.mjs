import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const publicDir = path.join(root, "public");
const dataDir = path.join(root, "src", "data");
const errors = [];

function fail(message) {
  errors.push(message);
}

function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    fail(`${path.relative(root, filePath)}: JSON no valido (${error.message})`);
    return null;
  }
}

const dataFiles = fs.readdirSync(dataDir).filter((file) => file.endsWith(".json"));
const data = Object.fromEntries(
  dataFiles.map((file) => [file, readJson(path.join(dataDir, file))]),
);

const sourceFiles = [];
for (const directory of ["src", "index.html"]) {
  const target = path.join(root, directory);
  if (fs.statSync(target).isFile()) {
    sourceFiles.push(target);
    continue;
  }

  const pending = [target];
  while (pending.length > 0) {
    const current = pending.pop();
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const entryPath = path.join(current, entry.name);
      if (entry.isDirectory()) pending.push(entryPath);
      if (entry.isFile() && /\.(tsx?|json)$/.test(entry.name)) sourceFiles.push(entryPath);
    }
  }
}

const assetPattern = /["'](\/[^"'?]+\.(?:png|jpe?g|webp|svg|mp4|mov))["']/gi;
const referencedAssets = new Set();

for (const file of sourceFiles) {
  const content = fs.readFileSync(file, "utf8");
  for (const match of content.matchAll(assetPattern)) referencedAssets.add(match[1]);
}

for (const asset of referencedAssets) {
  const assetPath = path.join(publicDir, asset.replace(/^\//, ""));
  if (!fs.existsSync(assetPath)) fail(`Falta el activo referenciado: ${asset}`);
}

const media = data["media.json"];
if (Array.isArray(media)) {
  const sources = media.map((item) => item.src);
  const duplicates = sources.filter((source, index) => sources.indexOf(source) !== index);
  if (duplicates.length > 0) fail(`Multimedia contiene duplicados: ${[...new Set(duplicates)].join(", ")}`);
}

const products = data["products.json"];
if (Array.isArray(products)) {
  const ids = products.map((product) => product.id);
  if (new Set(ids).size !== ids.length) fail("products.json contiene IDs duplicados");
}

const event = data["team-event.json"];
if (event) {
  const start = new Date(`${event.startDate}T12:00:00`);
  const end = new Date(`${event.endDate}T12:00:00`);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    fail("team-event.json contiene fechas no validas");
  } else if (start > end) {
    fail("team-event.json termina antes de empezar");
  }
  if (!Array.isArray(event.drivers) || event.drivers.length === 0) {
    fail("team-event.json necesita al menos un piloto");
  }
}

const robotsPath = path.join(publicDir, "robots.txt");
const sitemapPath = path.join(publicDir, "sitemap.xml");
if (!fs.existsSync(robotsPath)) fail("Falta public/robots.txt");
if (!fs.existsSync(sitemapPath)) fail("Falta public/sitemap.xml");

if (fs.existsSync(robotsPath)) {
  const robots = fs.readFileSync(robotsPath, "utf8");
  if (!robots.includes("https://lynxracingspainteam.com/sitemap.xml")) {
    fail("robots.txt no enlaza al sitemap oficial");
  }
}

if (fs.existsSync(sitemapPath)) {
  const sitemap = fs.readFileSync(sitemapPath, "utf8");
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  if (urls.length !== 21) fail(`sitemap.xml debe contener 21 rutas y contiene ${urls.length}`);
  if (new Set(urls).size !== urls.length) fail("sitemap.xml contiene rutas duplicadas");
}

if (errors.length > 0) {
  console.error("Validacion de contenido fallida:");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(
  `Contenido validado: ${dataFiles.length} JSON, ${referencedAssets.size} activos y 21 rutas SEO.`,
);
