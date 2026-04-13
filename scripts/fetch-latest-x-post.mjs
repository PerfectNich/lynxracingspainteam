import fs from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const envPath = path.join(projectRoot, ".env");
const outputPath = path.join(projectRoot, "src", "data", "latest-x-post.json");

function parseEnvFile(content) {
  const env = {};

  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex === -1) continue;

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim();
    env[key] = value;
  }

  return env;
}

function formatDateLabel(isoDate) {
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Madrid",
  }).format(date);
}

function normalizeText(text) {
  return text.replace(/\s+/g, " ").trim();
}

async function fetchJson(url, bearerToken) {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`X API ${response.status}: ${errorText}`);
  }

  return response.json();
}

async function main() {
  const envContent = await fs.readFile(envPath, "utf8");
  const env = parseEnvFile(envContent);

  const bearerToken = env.X_BEARER_TOKEN;
  const username = env.X_USERNAME;

  if (!bearerToken || !username) {
    throw new Error("Faltan X_BEARER_TOKEN o X_USERNAME en .env");
  }

  const userLookup = await fetchJson(
    `https://api.x.com/2/users/by/username/${encodeURIComponent(username)}`,
    bearerToken
  );

  const userId = userLookup?.data?.id;
  if (!userId) {
    throw new Error("No se pudo obtener el ID del usuario de X");
  }

  const posts = await fetchJson(
    `https://api.x.com/2/users/${encodeURIComponent(userId)}/tweets?max_results=5&exclude=replies,retweets&tweet.fields=created_at`,
    bearerToken
  );

  const latestPost = posts?.data?.[0];
  if (!latestPost) {
    throw new Error("No se encontraron publicaciones en la cuenta");
  }

  const output = {
    account: `@${username}`,
    dateLabel: formatDateLabel(latestPost.created_at),
    text: normalizeText(latestPost.text),
    url: `https://x.com/${username}/status/${latestPost.id}`,
    source: "api",
  };

  await fs.writeFile(outputPath, `${JSON.stringify(output, null, 2)}\n`, "utf8");
  console.log("Ultimo post de X sincronizado en src/data/latest-x-post.json");
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
