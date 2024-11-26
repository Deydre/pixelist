const express = require('express');
// Rutas de usuario
const wishlistedController = require("../controllers/wishlisted.controler");
const router = express.Router();

router.get("/:email", wishlistedController.getAllWishlistedFromUser);
router.post("/", wishlistedController.markAsWishlisted);
router.delete("/", wishlistedController.unmarkAsWishlisted);

module.exports = router;