const express = require('express');
// Rutas de usuario
const completedController = require("../controllers/completed.controler");
const router = express.Router();

router.get("/:email", completedController.getAllCompletedFromUser);
router.post("/", completedController.markAsCompleted);
router.delete("/", completedController.unmarkAsCompleted);

module.exports = router;