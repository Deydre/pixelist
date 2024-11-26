const queries = {
    // Ver todos los completados de un usuario ("/profile:id")
    getAllCompletedFromUser: `
    SELECT u.username, v.name, v.background_image, c.rating, c.date, c.review
    FROM users AS u
    INNER JOIN completed AS c ON u.id = c.id_user
    INNER JOIN videogames AS v ON v.id = c.id_game
    WHERE u.email = $1
    `,
    // Marcar como completado y escribir review y rating
    markAsCompleted: `INSERT INTO completed (id_user, id_game, date, rating, review) 
    VALUES ($1, $2, $3, $4, $5)
    `,
    // Desmarcar como completado 
    unmarkAsCompleted: `DELETE FROM completed
    WHERE id_user = $1 AND id_game = $2`

}
module.exports = queries;