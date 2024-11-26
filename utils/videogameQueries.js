const queries = {
    // Buscar videojuego por id
    checkVideogameExistsById: `
    SELECT *
    FROM videogames
    WHERE id=$1
    `,
    // // Marcar como completado y escribir review y rating
    // markAsCompleted: `INSERT INTO completed (id_user, id_game, date, rating, review) 
    // VALUES ($1, $2, $3, $4, $5)
    // `,
    // // Desmarcar como completado 
    // unmarkAsCompleted: `DELETE FROM completed
    // WHERE id_user = $1 AND id_game = $2`

}
module.exports = queries;