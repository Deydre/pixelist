// Inicializar el servidor con express
const express = require('express');
const app = express();
const port = 3000;

//Logger
const morgan = require("./middlewares/morgan")
app.use(morgan(':method :url :status - :response-time ms :body'));

// Habilitar la recepción de peticiones tipo JSON
app.use(express.json());

// Rutas importadas
const userRoutes = require("./routes/user.routes");
const videogameRoutes = require("./routes/videogame.routes");
const favoritesRoutes = require("./routes/favorites.routes");
const wishlistedRoutes = require("./routes/wishlisted.routes");
const completedRoutes = require("./routes/completed.routes");

// Rutas habilitadas
app.use('/api/user', userRoutes);
app.use('/api/videogame', videogameRoutes);
app.use('/api/favorites', favoritesRoutes);
app.use('/api/wishlisted', wishlistedRoutes);
app.use('/api/completed', completedRoutes);

// Para ruta no existente
app.use("*", (req, res) => {
    res.status(404).send("Ruta no encontrada");
})

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
});