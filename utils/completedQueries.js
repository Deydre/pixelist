const queries = {
    // Ver todos los completados de un usuario ("/profile:id")
    getAllCompletedFromUser: `SELECT u.username, v.name, c.rating, c.date, c.review
    FROM users AS u
    INNER JOIN completed AS c ON u.id = c.id_user
    INNER JOIN videogames AS v ON v.id = c.id_game
    WHERE u.username = $1;
    `,
    // Marcar como completado y escribir review y rating
    markAsCompleted: `INSERT INTO completed (id_user, id_game, rating, review, date) 
    VALUES ($1, $2, $3, $4, $5)
    `,
    // Desmarcar como completado 
    unmarkAsCompleted: `DELETE FROM completed
    WHERE id_user = $1 AND id_game = $2`

    // getAllFavoritesFromUser: `SELECT f.favorite_id, f.user_id, f.mongo_title, f.mongo_id
    // FROM favorites AS f
    // INNER JOIN users AS u
    // ON f.user_id = u.id
    // WHERE u.id = $1

    // `,
    // markAsFavorite: `INSERT INTO favorites(user_id,mongo_title,mongo_id) 
    // VALUES ($1,$2,$3)
    // `,
    // unmarkAsFavorite: `DELETE FROM favorites AS f
    // WHERE f.favorite_id = $1`
}
module.exports = queries;