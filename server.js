const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const { URL } = require("node:url");

const tmdbHandler = require("./api/tmdb");

const rootDir = __dirname;
const port = process.env.PORT || 3000;

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
  });
  res.end(JSON.stringify(payload));
}

function sendFile(res, filePath) {
  const extension = path.extname(filePath).toLowerCase();
  const contentType = contentTypes[extension] || "application/octet-stream";

  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not found");
      return;
    }

    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  });
}

function getSafeFilePath(requestPath) {
  const normalizedPath = path
    .normalize(requestPath)
    .replace(/^([.]{2}[\/\\])+/, "");
  return path.join(rootDir, normalizedPath);
}

const server = http.createServer((req, res) => {
  const requestUrl = new URL(
    req.url,
    `http://${req.headers.host || "localhost"}`,
  );

  if (requestUrl.pathname === "/api/tmdb") {
    tmdbHandler(
      {
        query: Object.fromEntries(requestUrl.searchParams.entries()),
      },
      {
        status(code) {
          this.statusCode = code;
          return this;
        },
        json(payload) {
          sendJson(res, this.statusCode || 200, payload);
        },
      },
    );
    return;
  }

  let requestPath = requestUrl.pathname;

  if (requestPath === "/") {
    requestPath = "/index.html";
  }

  const filePath = getSafeFilePath(requestPath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    sendFile(res, filePath);
    return;
  }

  const fallbackPath = path.join(rootDir, "index.html");
  sendFile(res, fallbackPath);
});

server.listen(port, () => {
  console.log(`Flixx running at http://localhost:${port}`);
});
