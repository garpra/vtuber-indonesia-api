const express = require("express");
const router = express.Router();
const controller = require("../controllers/vtuber.controller");
const { validate } = require("../middleware/validate");
const {
  createSchema,
  updateSchema,
  patchSchema,
} = require("../validators/vtuber.validator");

router.get("/", controller.getAllVtuber);
router.get("/:id", controller.getVtuberById);
router.post("/", validate(createSchema), controller.createVtuber);
router.put("/:id", validate(updateSchema), controller.updateVtuber);
router.patch("/:id", validate(patchSchema), controller.patchVtuber);
router.delete("/:id", controller.removeVtuber);

module.exports = router;
