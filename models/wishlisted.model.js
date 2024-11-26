const pool = require('../config/db_pgSQL')
const queries = require('../utils/wishlistedQueries') // Queries SQL

// GET BY EMAIL CONTROLLER PARAMS
const getAllWishlistedFromUser = async (email) => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.getAllWishlistedFromUser, [email])
        result = data.rows

    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

const markAsWishlisted = async (Wishlisted) => {
    const { id_user, id_game, date } = Wishlisted;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.markAsWishlisted, [id_user, id_game, date])
        result = data.rowCount
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

const unmarkAsWishlisted = async (cancelWishlisted) => {
    let { id_user, id_game } = cancelWishlisted
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.unmarkAsWishlisted, [id_user, id_game]);
        result = data.rowCount

    } catch (err) {
        console.log('Error unmarking wishlisted game:', err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};


const Wishlisted = {
    getAllWishlistedFromUser,
    markAsWishlisted,
    unmarkAsWishlisted
}

module.exports = Wishlisted;