const pool = require('../config/db_pgSQL')
const queries = require('../utils/videogameQueries') // Queries SQL

// GET BY EMAIL CONTROLLER PARAMS
const checkVideogameExistsById = async (id) => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.checkVideogameExistsById, [id])
        result = data.rows.length > 0;

    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    // Si existe devuelve true, si no, false
    return result
}

const Videogame = {
    checkVideogameExistsById,
}

module.exports = Videogame;