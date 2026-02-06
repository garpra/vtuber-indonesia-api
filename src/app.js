const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const routes = require("./routes");

const app = express();

app.use(cors());
app.use(morgan(process.env.LOG_FORMAT));
app.use(express.json());

app.use("/api/v1", routes);

app.use((req, res) => {
  res.status(404).json({ success: false, error: "Route not found" });
});

module.exports = app;
