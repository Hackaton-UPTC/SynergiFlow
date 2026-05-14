require("./config/config");

const fs = require("fs");
const path = require("path");
const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

function loadDotEnv(filePath) {
  if (!fs.existsSync(filePath)) return;

  const content = fs.readFileSync(filePath, "utf8");
  content.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return;

    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex === -1) return;

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim().replace(/^['\"]|['\"]$/g, "");

    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  });
}

loadDotEnv(path.join(__dirname, ".env"));

const allowedOrigins = (process.env.FRONTEND_ORIGIN || process.env.FRONTEND_ORIGINS || "http://localhost:4000")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
};

app.use(
  cors(corsOptions)
);
app.options("*", cors(corsOptions));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: false }));

db.connect(app);
require("./routes")(app);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Requested API not found",
  });
});

app.on("ready", () => {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log("Server is up on port", port);
  });
});

module.exports = app;
