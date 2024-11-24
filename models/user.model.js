const pool = require('../config/db_pgSQL');
const queries = require('../utils/userQueries') // Queries SQL
const bcrypt = require('bcryptjs');

// POST (CREATE)
const createUser = async (user) => {
    const { username, email, password, avatar, quote } = user;
    let client, result;

    try {
        client = await pool.connect(); // Espera a abrir conexion
        const hashedPassword = password ? await bcrypt.hash(password, 10) : null; // Si hay contraseña, la hasheamos
        const data = await client.query(queries.createUser,[username, email, hashedPassword, avatar, quote])
        result = data.rowCount
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

// // GET ALL
// const getAllUsers = async () => {
//     let client, result;
//     try {
//         client = await pool.connect(); // Espera a abrir conexion
//         const data = await client.query(queries.getAllUsers)
//         result = data.rows
//     } catch (err) {
//         console.log(err);
//         throw err;
//     } finally {
//         client.release();
//     }
//     return result
// }
// // GET BY EMAIL CONTROLLER PARAMS
// const getUsersByEmail = async (email) => {
//     let client, result;
//     try {
//         client = await pool.connect(); // Espera a abrir conexion
//         const data = await client.query(queries.getUsersByEmail, [email])
//         result = data.rows
        
//     } catch (err) {
//         console.log(err);
//         throw err;
//     } finally {
//         client.release();
//     }
//     return result
// }



// //UPDATE
// const updateUserByEmail = async (updatedUser, currentEmail) => {
//     const { name, email, password, img } = updatedUser;
//     let client, result;
//     try {
//         client = await pool.connect();
//         const hashedPassword = password ? await bcrypt.hash(password, 10) : null; // Si hay contraseña, la hasheamos
//         const data = await client.query(queries.updateUserByEmail, [name, email, hashedPassword, img, currentEmail]);
//         result = data.rows; // Devuelve la fila actualizada
//     } catch (err) {
//         console.log('Error updating user:', err);
//         throw err;
//     } finally {
//         client.release();
//     }
//     return result;
// };
// // DELETE
// const deleteUserByEmail = async (userToDelete) => {
//     const email = userToDelete;
//     let client, result;
//     try {
//         client = await pool.connect();
//         const data = await client.query(queries.deleteUserByEmail, [email]);
//         result = data.rowCount
        
//     } catch (err) {
//         console.log('Error deleting user:', err);
//         throw err;
//     } finally {
//         client.release();
//     }
//     return result;
// };

const Users = {
    createUser
}

module.exports = Users;