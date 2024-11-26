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
const completedRoutes = require("./routes/completed.routes");
const videogameRoutes = require("./routes/videogame.routes");


// Rutas habilitadas
app.use('/api/user', userRoutes);
app.use('/api/completed', completedRoutes);
app.use('/api/videogame', videogameRoutes);

// Para ruta no existente
app.use("*", (req, res) => {
    res.status(404).send("Ruta no encontrada");
})

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
});