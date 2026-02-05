const express = require("express");
const router = express.Router();
const vtuberRoutes = require("./vtuber.routes");

router.use("/vtubers", vtuberRoutes);
router.get("/health", (req, res) => {
  res.json({ success: true, message: "API is running" });
});

module.exports = router;
