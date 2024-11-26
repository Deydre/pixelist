const queries = {
    // Buscar videojuego por id
    checkVideogameExistsById: `
    SELECT *
    FROM videogames
    WHERE id=$1
    `,
    createVideogame: `
    INSERT INTO videogames (id, name, background_image) 
    VALUES ($1, $2, $3)
    `
}
module.exports = queries;