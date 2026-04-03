const fs = require("node:fs");
const path = require("node:path");

const TMDB_BASE_URL = "https://api.themoviedb.org/3/";
const API_KEY_ENV_NAMES = [
  "TMDB_KEY",
  "TMDB_API_KEY",
  "VITE_TMDB_KEY",
  "NEXT_PUBLIC_TMDB_KEY",
];

function getTmdbApiKey() {
  for (const envName of API_KEY_ENV_NAMES) {
    const value = process.env[envName];
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return "";
}

function loadLocalEnv() {
  if (getTmdbApiKey()) {
    return;
  }

  const envPath = path.join(__dirname, "..", ".env");

  if (!fs.existsSync(envPath)) {
    return;
  }

  const envFile = fs.readFileSync(envPath, "utf8").replace(/^\uFEFF/, "");

  envFile.split(/\r?\n/).forEach((line) => {
    const trimmedLine = line.trim();

    if (!trimmedLine || trimmedLine.startsWith("#")) {
      return;
    }

    const separatorIndex = trimmedLine.indexOf("=");

    if (separatorIndex === -1) {
      return;
    }

    const key = trimmedLine
      .slice(0, separatorIndex)
      .trim()
      .replace(/^\uFEFF/, "");
    const value = trimmedLine
      .slice(separatorIndex + 1)
      .trim()
      .replace(/^['\"]|['\"]$/g, "");

    if (key && value && !process.env[key]) {
      process.env[key] = value;
    }
  });
}

module.exports = async function handler(req, res) {
  loadLocalEnv();

  const { endpoint, ...query } = req.query || {};

  if (!endpoint || typeof endpoint !== "string") {
    res.status(400).json({ error: "Missing endpoint query parameter." });
    return;
  }

  const apiKey = getTmdbApiKey();

  if (!apiKey) {
    res.status(500).json({
      error: "TMDB API key is not configured. Set TMDB_KEY in .env.",
    });
    return;
  }

  const targetUrl = new URL(endpoint, TMDB_BASE_URL);
  targetUrl.searchParams.set("api_key", apiKey);

  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== null && value !== "") {
      targetUrl.searchParams.set(key, value);
    }
  }

  try {
    const response = await fetch(targetUrl.toString());
    const data = await response.json();

    res.status(response.status).json(data);
  } catch (error) {
    console.error("TMDB proxy error:", error);
    res.status(500).json({ error: "Failed to fetch data from TMDB." });
  }
};
