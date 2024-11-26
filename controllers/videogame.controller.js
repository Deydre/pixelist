const videogameModel = require('../models/videogame.model'); // Importar el modelo de la BBDD


const createVideogame = async (req, res, next) => {
    try {
        const newVideogame = req.body; // {id, name, background_image}
        const response = await videogameModel.createVideogame(newVideogame);
        res.status(201).json({
            "items_created": response,
            message: `Videogame created: ${newVideogame.name}`,
            id: newVideogame.id,
            name: newVideogame.name,
            background_image: newVideogame.background_image,
        })
    } catch (error) {
        console.error('Error updating User:', error)
        res.status(500).json({ error: 'Internal server error' })
        next(error)
    }
}

const checkVideogameExistsById = async (req, res) => {
    let { id } = req.params;
    let exists;
    exists = await videogameModel.checkVideogameExistsById(id);

    res.status(200).json(exists);
}


module.exports = {
    createVideogame,
    checkVideogameExistsById,
}