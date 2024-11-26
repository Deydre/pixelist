const pool = require('../config/db_pgSQL')
const queries = require('../utils/favoriteQueries') // Queries SQL

// GET BY EMAIL CONTROLLER PARAMS
const getAllFavoritesFromUser = async (email) => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.getAllFavoritesFromUser, [email])
        result = data.rows

    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

const markAsFavorite = async (favorited) => {
    const { id_user, id_game, date } = favorited;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.markAsFavorite, [id_user, id_game, date])
        result = data.rowCount
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

const unmarkAsFavorite = async (cancelFavorite) => {
    let { id_user, id_game } = cancelFavorite
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.unmarkAsFavorite, [id_user, id_game]);
        result = data.rowCount

    } catch (err) {
        console.log('Error unmarking favorite game:', err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};


const Favorites = {
    getAllFavoritesFromUser,
    markAsFavorite,
    unmarkAsFavorite
}

module.exports = Favorites;