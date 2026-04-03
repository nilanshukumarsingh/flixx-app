const fs = require("node:fs");
const path = require("node:path");

const TMDB_BASE_URL = "https://api.themoviedb.org/3/";

function loadLocalEnv() {
  if (process.env.TMDB_KEY) {
    return;
  }

  const envPath = path.join(__dirname, "..", ".env");

  if (!fs.existsSync(envPath)) {
    return;
  }

  const envFile = fs.readFileSync(envPath, "utf8");

  envFile.split(/\r?\n/).forEach((line) => {
    const trimmedLine = line.trim();

    if (!trimmedLine || trimmedLine.startsWith("#")) {
      return;
    }

    const separatorIndex = trimmedLine.indexOf("=");

    if (separatorIndex === -1) {
      return;
    }

    const key = trimmedLine.slice(0, separatorIndex).trim();
    const value = trimmedLine
      .slice(separatorIndex + 1)
      .trim()
      .replace(/^['\"]|['\"]$/g, "");

    if (key && !process.env[key]) {
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

  const apiKey = process.env.TMDB_KEY;

  if (!apiKey) {
    res.status(500).json({ error: "TMDB_KEY is not configured." });
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
