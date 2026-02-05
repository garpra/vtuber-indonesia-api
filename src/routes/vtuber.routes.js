const express = require("express");
const router = express.Router();
const controller = require("../controllers/vtuber.controller");

router.get("/", controller.getAllVtuber);
router.get("/:id", controller.getVtuberById);
router.post("/", controller.createVtuber);
router.put("/:id", controller.updateVtuber);
router.patch("/:id", controller.patchVtuber);
router.delete("/:id", controller.removeVtuber);

module.exports = router;
