const pool = require('../config/db_pgSQL')
const queries = require('../utils/completedQueries') // Queries SQL
const bcrypt = require('bcryptjs');

// GET BY EMAIL CONTROLLER PARAMS
const getAllCompletedFromUser = async (email) => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.getAllCompletedFromUser, [email])
        result = data.rows

    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}
const markAsCompleted = async (completed) => {
    const { id_user, id_game, date, rating, review } = completed;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.markAsCompleted, [id_user, id_game, date, rating, review])
        result = data.rowCount
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

const unmarkAsCompleted = async (cancelCompleted) => {
    let { id_user, id_game } = cancelCompleted
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.unmarkAsCompleted, [id_user, id_game]);
        result = data.rowCount

    } catch (err) {
        console.log('Error unmarking completed game:', err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};


const Completed = {
    getAllCompletedFromUser,
    markAsCompleted,
    unmarkAsCompleted
}

module.exports = Completed;