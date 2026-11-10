import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import { setTimeout as delay } from "node:timers/promises";

const origin = new URL("https://lynxracingspainteam.com");
const routes = [
  { url: "/", file: "dist/index.html", chunk: null },
  { url: "/contacto/", file: "dist/contacto/index.html", chunk: "ContactPage" },
  { url: "/multimedia/", file: "dist/multimedia/index.html", chunk: "MediaPage" },
];
const sha = process.env.GITHUB_SHA;
assert.match(sha ?? "", /^[a-f0-9]{40}$/, "Se requiere GITHUB_SHA");
const marker = `<meta name="lynx-build" content="${sha}">`;

async function get(path, type, status = 200) {
  const url = new URL(path, origin);
  assert.equal(url.origin, origin.origin);
  url.searchParams.set("lynx_verify", `${sha}-${Date.now()}`);
  const response = await fetch(url, { signal: AbortSignal.timeout(8000) });
  assert.equal(response.status, status, `${path}: HTTP ${response.status}; se esperaba ${status}`);
  assert.equal(new URL(response.url).origin, origin.origin, `${path}: dominio inesperado`);
  assert.ok(response.headers.get("content-type")?.includes(type), `${path}: tipo inesperado`);
  return response.text();
}

async function check() {
  const template = await readFile("index.html", "utf8");
  const email = template.match(/"email"\s*:\s*"([^"]+)"/)?.[1];
  assert.ok(email, "No se encontró el correo esperado en index.html");
  const entries = new Map();
  for (const route of routes) {
    const html = await get(route.url, "text/html");
    assert.ok(html.includes(marker), `${route.url}: todavía no sirve el commit ${sha}`);
    const entry = html.match(/<script\b[^>]*\btype="module"[^>]*\bsrc="(\/assets\/[^"]+\.js)"/)?.[1];
    assert.ok(entry, `${route.url}: falta el JavaScript principal`);
    if (!entries.has(entry)) entries.set(entry, await get(entry, "javascript"));
    if (route.chunk) {
      const chunk = entries.get(entry).match(new RegExp(`(?:assets/)?${route.chunk}-[\\w-]+\\.js`))?.[0];
      assert.ok(chunk, `${route.url}: falta la página en el JavaScript principal`);
      const source = await get(`/assets/${chunk.split("/").at(-1)}`, "javascript");
      if (route.chunk === "ContactPage") {
        const links = source.match(/mailto:[^"'\s]+/g) ?? [];
        assert.ok(links.length && links.every((link) => link === `mailto:${email}`),
          `${route.url}: los enlaces mailto no coinciden con ${email}`);
      }
    }
    console.log(`OK ${route.url} — ${sha.slice(0, 7)}`);
  }
  const notFound = await get(`/__lynx-not-found-${sha}/`, "text/html", 404);
  assert.ok(notFound.includes(marker), "La página 404 no corresponde al despliegue nuevo");
  assert.ok(notFound.includes('<div id="root"></div>'), "El 404 no carga la aplicación Lynx");
  console.log("OK ruta inexistente — HTTP 404");
}

if (process.argv[2] === "stamp") {
  for (const file of [...routes.map((route) => route.file), "dist/404.html"]) {
    const html = await readFile(file, "utf8");
    assert.ok(html.includes("</head>"), `${file}: falta </head>`);
    await writeFile(file, html.replace("</head>", `${marker}\n</head>`));
  }
} else if (process.argv[2] === "check") {
  for (let attempt = 1; ; attempt++) {
    try {
      await check();
      break;
    } catch (error) {
      if (attempt === 8) throw error;
      console.warn(`Intento ${attempt}/8: ${error.message}`);
      await delay(10000);
    }
  }
} else {
  throw new Error("Uso: node scripts/verify-pages.mjs stamp|check");
}
