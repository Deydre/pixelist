const queries = {
    // Crear usuario en Sign Up (avatar + quote opcionales) ("/signup")
    createUser: `
    INSERT INTO users(username, email, password, avatar, quote)
    VALUES ($1,$2,$3,$4, $5)
    `,
    // Lista de usuarios en la base de datos ("/users")
    getAllUsers: `
    SELECT username, avatar, quote
    FROM users
    ORDER BY id;`,
    // Buscar el username en el token y mostrar el usuario conectado + Mostrar perfil de usuario concreto ("/users/:id")
    getUserByEmail: `
    SELECT id, username, email, password, avatar, quote
    FROM users
    WHERE email=$1;`,
    // Editar el perfil del propio usuario (no puede cambiarse el email) ("/profile/:id")
    updateUserByEmail: `
    UPDATE users
    SET username = $2, password = $3, avatar = $4, quote = $5
    WHERE email = $1
    `,
    // Borrar el propio perfil por email ("/profile")
    deleteUserByEmail: `
    DELETE FROM users
    WHERE email = $1;
    `
}
module.exports = queries;