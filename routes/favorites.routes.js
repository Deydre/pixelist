const express = require('express');
// Rutas de usuario
const favoritesController = require("../controllers/favorites.controller");
const router = express.Router();

router.get("/:email", favoritesController.getAllFavoritesFromUser);
router.post("/", favoritesController.markAsFavorite);
router.delete("/", favoritesController.unmarkAsFavorite);

module.exports = router;