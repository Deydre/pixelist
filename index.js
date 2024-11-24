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

// Rutas habilitadas
app.use('/api/user', userRoutes);

// Para ruta no existente
app.use("*", (req, res) => {
    res.status(404).send("Ruta no encontrada");
})

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
});