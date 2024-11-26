const express = require('express');
// Rutas de usuario
const videogameController = require("../controllers/videogame.controller");
const router = express.Router();

router.get('/:id', videogameController.checkVideogameExistsById);
router.post('/', videogameController.createVideogame);

module.exports = router;