// Inicializar el servidor con express
const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

//Logger
const morgan = require("./middlewares/morgan")
app.use(morgan(':method :url :status - :response-time ms :body'));

// Habilitar la recepción de peticiones tipo JSON
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // URL del front
    credentials: true
}));

// Rutas importadas
const userRoutes = require("./routes/user.routes");
const videogameRoutes = require("./routes/videogame.routes");
const favoritesRoutes = require("./routes/favorites.routes");
const wishlistedRoutes = require("./routes/wishlisted.routes");
const completedRoutes = require("./routes/completed.routes");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'client/build')));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rutas habilitadas
app.use('/api/user', userRoutes);
app.use('/api/videogame', videogameRoutes);
app.use('/api/favorites', favoritesRoutes);
app.use('/api/wishlisted', wishlistedRoutes);
app.use('/api/completed', completedRoutes);

app.get("*", (req, res) => { res.sendFile(path.join(__dirname + '/client/build/index.html')) });


// Para ruta no existente
app.use("*", (req, res) => {
    res.status(404).send("Ruta no encontrada");
})


app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
});