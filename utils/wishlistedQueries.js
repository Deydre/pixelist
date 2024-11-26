const queries = {
    // Ver todos los completados de un usuario ("/profile:id")
    getAllWishlistedFromUser: `
    SELECT u.username, v.name, v.background_image, c.date
    FROM users AS u
    INNER JOIN wishlisted AS c ON u.id = c.id_user
    INNER JOIN videogames AS v ON v.id = c.id_game
    WHERE u.email = $1
    `,
    // Marcar como completado y escribir review y rating
    markAsWishlisted: `INSERT INTO wishlisted (id_user, id_game, date) 
    VALUES ($1, $2, $3)
    `,
    // Desmarcar como completado 
    unmarkAsWishlisted: `DELETE FROM wishlisted
    WHERE id_user = $1 AND id_game = $2`

}
module.exports = queries;