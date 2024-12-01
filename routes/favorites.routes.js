const express = require('express');
const getAccessToken = require('../middlewares/getAccessToken');
const decodeToken = require('../middlewares/decodeToken');
const favoritesController = require("../controllers/favorites.controller");
const router = express.Router();

router.get("/:email", favoritesController.getAllFavoritesFromUser);
router.post("/", getAccessToken, decodeToken, favoritesController.markAsFavorite);
router.delete("/", favoritesController.unmarkAsFavorite);
router.delete("/all", favoritesController.deleteFavoritesFromUser);
module.exports = router;