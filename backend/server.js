require("./config/config");

const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

const allowedOrigins = (process.env.FRONTEND_ORIGIN || process.env.FRONTEND_ORIGINS || "http://localhost:4000")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error(`CORS blocked for origin: ${origin}`));
    },
  })
);
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
