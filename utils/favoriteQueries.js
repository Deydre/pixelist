const queries = {
    // Ver todos los completados de un usuario ("/profile:id")
    getAllFavoritesFromUser: `
    SELECT u.username, v.name, v.background_image, f.date
    FROM users AS u
    INNER JOIN favorites AS f ON u.id = f.id_user
    INNER JOIN videogames AS v ON v.id = f.id_game
    WHERE u.email = $1
    `,
    // Marcar como completado y escribir review y rating
    markAsFavorite: `INSERT INTO favorites (id_user, id_game, date) 
    VALUES ($1, $2, $3)
    `,
    // Desmarcar como completado 
    unmarkAsFavorite: `DELETE FROM favorites
    WHERE id_user = $1 AND id_game = $2`

}
module.exports = queries;