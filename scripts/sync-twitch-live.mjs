import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const membersPath = path.join(rootDir, "src", "data", "members.json");
const liveStatusPath = path.join(rootDir, "src", "data", "live-status.json");
const twitchWebClientId = "kimne78kx3ncx6brgo4mv6wki5h1ko";

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function chunk(values, size) {
  const chunks = [];
  for (let index = 0; index < values.length; index += size) {
    chunks.push(values.slice(index, index + size));
  }
  return chunks;
}

async function fetchAppToken(clientId, clientSecret) {
  const response = await fetch("https://id.twitch.tv/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "client_credentials",
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(
      `No se pudo pedir el token de Twitch: ${response.status} ${response.statusText} ${details}`,
    );
  }

  const payload = await response.json();
  return payload.access_token;
}

async function fetchStreamFromGraphql(channel) {
  const response = await fetch("https://gql.twitch.tv/gql", {
    method: "POST",
    headers: {
      "Client-Id": twitchWebClientId,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query:
        "query($login:String!){user(login:$login){login displayName stream{title viewersCount createdAt}}}",
      variables: { login: channel },
    }),
  });

  if (!response.ok) {
    throw new Error(`No se pudo consultar Twitch GraphQL: ${response.status} ${response.statusText}`);
  }

  const payload = await response.json();
  const user = payload?.data?.user;
  const stream = user?.stream;

  if (!user || !stream) {
    return null;
  }

  return {
    user_login: user.login ?? channel,
    user_name: user.displayName ?? channel,
    title: stream.title ?? "",
    viewer_count: Number(stream.viewersCount ?? 0),
    started_at: stream.createdAt ?? "",
  };
}

async function fetchStreamsFromGraphql(channels) {
  const liveStreams = [];

  for (const channel of channels) {
    const stream = await fetchStreamFromGraphql(channel);

    if (stream) {
      liveStreams.push(stream);
    }
  }

  return liveStreams;
}

async function fetchLiveStreams(clientId, clientSecret, channels) {
  if (clientId && clientSecret) {
    try {
      const accessToken = await fetchAppToken(clientId, clientSecret);
      return await fetchStreams(clientId, accessToken, channels);
    } catch (error) {
      console.warn(`Helix no disponible, usando fallback publico: ${error.message}`);
    }
  } else {
    console.warn("Faltan TWITCH_CLIENT_ID o TWITCH_CLIENT_SECRET; usando fallback publico.");
  }

  return fetchStreamsFromGraphql(channels);
}

async function fetchStreams(clientId, accessToken, channels) {
  const liveStreams = [];

  for (const group of chunk(channels, 100)) {
    const search = new URLSearchParams();
    for (const channel of group) {
      search.append("user_login", channel);
    }

    const response = await fetch(`https://api.twitch.tv/helix/streams?${search.toString()}`, {
      headers: {
        "Client-Id": clientId,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`No se pudo consultar Twitch Helix: ${response.status} ${response.statusText}`);
    }

    const payload = await response.json();
    liveStreams.push(...payload.data);
  }

  return liveStreams;
}

function createDisabledState() {
  return {
    enabled: false,
    label: "Lynx Racing",
    channelName: "",
    driverName: "",
    liveChannels: [],
    liveDrivers: [],
    liveCount: 0,
    additionalLiveCount: 0,
    isMainChannelLive: false,
    url: "https://www.twitch.tv/lynxracingspainteam",
    ctaUrl: "/roster#streams",
  };
}

async function main() {
  const clientId = process.env.TWITCH_CLIENT_ID;
  const clientSecret = process.env.TWITCH_CLIENT_SECRET;

  const membersRaw = await readFile(membersPath, "utf8");
  const members = JSON.parse(membersRaw);
  const rosterEntries = [...members.management, ...members.drivers];
  const channels = unique(members.twitchChannels);

  const liveStreams = await fetchLiveStreams(clientId, clientSecret, channels);
  const liveByChannel = new Map(
    liveStreams.map((stream) => [String(stream.user_login).toLowerCase(), stream]),
  );

  const mainChannel = "lynxracingspainteam";
  const priorityChannels = [
    ...channels.filter((channel) => channel.toLowerCase() === mainChannel),
    ...channels.filter((channel) => channel.toLowerCase() !== mainChannel),
  ].filter((channel) => liveByChannel.has(channel.toLowerCase()));
  const selectedChannel = priorityChannels[0];
  const output = createDisabledState();
  output.liveCount = liveStreams.length;
  output.additionalLiveCount = Math.max(0, liveStreams.length - 1);
  output.isMainChannelLive = liveByChannel.has(mainChannel);
  output.liveChannels = priorityChannels;
  output.liveDrivers = priorityChannels.map((channel) => {
    const member = rosterEntries.find(
      (entry) => String(entry.twitch || "").toLowerCase() === channel.toLowerCase(),
    );
    const isMainChannel = channel.toLowerCase() === mainChannel;

    return member?.name ?? (isMainChannel ? "Lynx Racing" : channel);
  });

  if (selectedChannel) {
    const stream = liveByChannel.get(selectedChannel.toLowerCase());
    const member = rosterEntries.find(
      (entry) => String(entry.twitch || "").toLowerCase() === selectedChannel.toLowerCase(),
    );
    const isMainChannel = selectedChannel.toLowerCase() === "lynxracingspainteam";

    output.enabled = true;
    output.channelName = selectedChannel;
    output.driverName = member?.name ?? (isMainChannel ? "Lynx Racing" : selectedChannel);
    output.label =
      output.liveDrivers.length > 1
        ? `${output.liveDrivers.length} directos Lynx`
        : isMainChannel
          ? "Lynx Racing"
          : member?.name ?? selectedChannel;
    output.url = `https://www.twitch.tv/${selectedChannel}`;
    output.ctaUrl = "/roster#streams";
    output.title = stream?.title ?? "";
    output.viewerCount = Number(stream?.viewer_count ?? 0);
    output.startedAt = stream?.started_at ?? "";
  }

  await writeFile(liveStatusPath, `${JSON.stringify(output, null, 2)}\n`, "utf8");

  if (output.enabled) {
    console.log(`Directo activo detectado: ${output.channelName} (${output.driverName})`);
  } else {
    console.log("No hay canales del equipo en directo.");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
