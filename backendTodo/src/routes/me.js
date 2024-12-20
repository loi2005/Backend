const express = require("express");
const meController = require("../app/controllers/MeController.js");
const router = express.Router();
meController.index;
router.get("/todos", meController.showInfo);
router.post("/todos", meController.create);
router.put("/todos/:id", meController.update);
router.delete("/todos/:id", meController.delete);
module.exports = router;
