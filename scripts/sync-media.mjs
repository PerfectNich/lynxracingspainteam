import { promises as fs } from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const inboxDir = path.join(rootDir, "public", "media", "inbox");
const mediaDir = path.join(rootDir, "public", "media");
const mediaJsonPath = path.join(rootDir, "src", "data", "media.json");

const imageExtensions = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".avif"]);
const videoExtensions = new Set([".mp4", ".mov", ".webm"]);

function isSupported(ext) {
  return imageExtensions.has(ext) || videoExtensions.has(ext);
}

function sanitizeBaseName(name) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
      continue;
    }

    files.push(fullPath);
  }

  return files;
}

function deriveGame(relativeFile) {
  const segments = relativeFile.split(path.sep);
  const folderName = segments.length > 1 ? segments[0] : "General";

  if (folderName.toLowerCase() === "general") {
    return "General";
  }

  return folderName;
}

function buildUniqueFileName(baseName, ext, usedNames) {
  let candidate = `${baseName}${ext}`;
  let counter = 1;

  while (usedNames.has(candidate)) {
    candidate = `${baseName}-${String(counter).padStart(2, "0")}${ext}`;
    counter += 1;
  }

  usedNames.add(candidate);
  return candidate;
}

async function main() {
  await ensureDir(inboxDir);

  const rawMedia = await fs.readFile(mediaJsonPath, "utf8");
  const mediaItems = JSON.parse(rawMedia);
  const existingSrc = new Set(mediaItems.map((item) => item.src));
  const usedNames = new Set(
    mediaItems
      .map((item) => item.src.replace(/^\/media\//, ""))
      .filter(Boolean)
  );

  const files = (await walk(inboxDir)).filter((file) => isSupported(path.extname(file).toLowerCase()));

  if (files.length === 0) {
    console.log("No new files found in public/media/inbox.");
    return;
  }

  const newEntries = [];

  for (const file of files) {
    const relativeToInbox = path.relative(inboxDir, file);
    const ext = path.extname(file).toLowerCase();
    const type = imageExtensions.has(ext) ? "image" : "video";
    const originalName = path.basename(file, ext);
    const game = deriveGame(relativeToInbox);
    const cleanBase = sanitizeBaseName(originalName) || "media-item";
    const uniqueName = buildUniqueFileName(cleanBase, ext, usedNames);
    const targetPath = path.join(mediaDir, uniqueName);
    const publicSrc = `/media/${uniqueName}`;

    if (existingSrc.has(publicSrc)) {
      await fs.unlink(file);
      continue;
    }

    await fs.rename(file, targetPath);

    const entry =
      type === "image"
        ? {
            type,
            src: publicSrc,
            alt: game,
            game,
          }
        : {
            type,
            src: publicSrc,
            game,
          };

    newEntries.push(entry);
    existingSrc.add(publicSrc);
    console.log(`Added: ${publicSrc} (${game})`);
  }

  if (newEntries.length === 0) {
    console.log("No new files needed to be registered.");
    return;
  }

  const updatedMedia = [...newEntries, ...mediaItems];
  await fs.writeFile(mediaJsonPath, `${JSON.stringify(updatedMedia, null, 2)}\n`, "utf8");

  console.log(`\nSync complete. ${newEntries.length} file(s) added to media.json.`);
  console.log("Inbox folder: public/media/inbox/<Game>/file.ext");
}

main().catch((error) => {
  console.error("Error al sincronizar multimedia:", error);
  process.exitCode = 1;
});
