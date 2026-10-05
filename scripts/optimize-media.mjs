import { execFileSync } from "node:child_process";
import { promises as fs } from "node:fs";
import path from "node:path";

const root = process.cwd();
const publicDir = path.join(root, "public");
const mediaFile = path.join(root, "src", "data", "media.json");
const items = JSON.parse(await fs.readFile(mediaFile, "utf8"));
let generated = 0;
let savedBytes = 0;

for (const [index, item] of items.entries()) {
  if (item.type !== "image" && item.type !== "video") continue;
  const source = item.type === "video" ? item.poster || item.src : item.src;
  if (typeof source !== "string" || !source.startsWith("/media/")) {
    throw new Error(`Ruta multimedia no válida en la entrada ${index + 1}: ${source}`);
  }

  const sourcePath = path.join(publicDir, source.slice(1));
  const sourceStat = await fs.stat(sourcePath);
  const stem = path.parse(source).name.replace(/[^a-z0-9_-]/gi, "-");
  const thumbnail = `/media/thumbs/thumb-${String(index + 1).padStart(2, "0")}-${stem}.webp`;
  const thumbnailPath = path.join(publicDir, thumbnail.slice(1));
  await fs.mkdir(path.dirname(thumbnailPath), { recursive: true });

  if (item.thumbnail === thumbnail && await fs.stat(thumbnailPath).then(() => true, () => false)) continue;

  const args = ["-hide_banner", "-loglevel", "error", "-y"];
  if (item.type === "video" && !item.poster) args.push("-ss", "00:00:01");
  args.push(
    "-i", sourcePath,
    "-frames:v", "1",
    "-vf", "scale=w='min(900,iw)':h='min(900,ih)':force_original_aspect_ratio=decrease",
    "-c:v", "libwebp",
    "-q:v", "76",
    thumbnailPath,
  );
  execFileSync("ffmpeg", args, { stdio: "pipe" });

  const thumbnailStat = await fs.stat(thumbnailPath);
  item.thumbnail = thumbnail;
  generated += 1;
  savedBytes += Math.max(0, sourceStat.size - thumbnailStat.size);
  console.log(`${thumbnail}: ${(sourceStat.size / 1024).toFixed(0)} KB → ${(thumbnailStat.size / 1024).toFixed(0)} KB`);
}

await fs.writeFile(mediaFile, `${JSON.stringify(items, null, 2)}\n`, "utf8");
console.log(`Generadas ${generated} miniaturas WebP. Ahorro aproximado en la cuadrícula: ${(savedBytes / 1024 / 1024).toFixed(2)} MB.`);
console.log("Repite npm run optimize:media después de sync:media para generar miniaturas de nuevas imágenes.");
