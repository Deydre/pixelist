const VideogameModel = require('../models/videogame.model'); // Importar el modelo de la BBDD

const checkVideogameExistsById = async (req, res) => {
    let { id } = req.params;
    let exists;
    exists = await VideogameModel.checkVideogameExistsById(id);

    res.status(200).json(exists);
}


const createVideogame = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array(),
            });
        }
        const newVideogame = req.body; // {id, name, background_image}
        const response = await UserModel.createVideogame(newVideogame);
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

module.exports = {
    checkVideogameExistsById,
    createVideogame
}