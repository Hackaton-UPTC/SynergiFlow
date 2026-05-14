require("./config/config");

const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
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
