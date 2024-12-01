const pool = require('../config/db_pgSQL');
const queries = require('../utils/userQueries') // Queries SQL
const bcrypt = require('bcryptjs');

// POST (CREATE)
const createUser = async (user) => {
    const { username, email, password} = user;
    let client, result;

    try {
        client = await pool.connect(); // Espera a abrir conexion
        console.log("Conexión a la base de datos establecida.");
        const hashedPassword = password ? await bcrypt.hash(password, 10) : null; // Si hay contraseña, la hasheamos
        const data = await client.query(queries.createUser, [username, email, hashedPassword])
        result = data.rowCount
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

const login = async (email, password) => {
    let client, result;
    client = await pool.connect();
    try {
        const userExists = await client.query(queries.checkLogin, [email, password]);
        console.log(userExists);
        return userExists;

    } catch (error) {
        console.log(error.message);
        throw error
    };
};


// GET ALL (READ)
const getAllUsers = async () => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.getAllUsers)
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

// GET BY EMAIL (CONTROLLER PARAMS)
const getUserByEmail = async (email) => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.getUserByEmail, [email])
        result = data.rows

    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

//UPDATE BY EMAIL
const updateUserByEmail = async (updatedUser, currentEmail) => {
    const { username, password, avatar, quote } = updatedUser;
    let client, result;
    try {
        client = await pool.connect();
        const hashedPassword = password ? await bcrypt.hash(password, 10) : null; // Si hay contraseña, la hasheamos
        const data = await client.query(queries.updateUserByEmail, [currentEmail, username, hashedPassword, avatar, quote]);
        result = data.rowCount; // Devuelve el número de filas actualizadas (para definir en el controlador si el email existe o no)
    } catch (err) {
        console.log('Error updating user:', err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};

// DELETE
const deleteUserByEmail = async (userToDelete) => {
    const email = userToDelete;
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.deleteUserByEmail, [email]);
        result = data.rowCount

    } catch (err) {
        console.log('Error deleting user:', err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};

const Users = {
    createUser,
    login,
    getAllUsers,
    getUserByEmail,
    updateUserByEmail,
    deleteUserByEmail
}

module.exports = Users;