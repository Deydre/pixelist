const FavoritesModel = require('../models/favorites.model'); // Importar el modelo de la BBDD

const getAllFavoritesFromUser = async (req, res) => {
    const email = req.params.email;
    console.log(email)
    try {
        const userData = await FavoritesModel.getAllFavoritesFromUser(email);
        if (userData) {
            res.status(200).json(userData);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error obtaining favorites by email:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const markAsFavorite = async (req, res) => {
    try {
        const newFavorite = req.body; // {id_user, id_game, date, rating, review}
        const response = await FavoritesModel.markAsFavorite(newFavorite);
        res.status(201).json({
            "items_created": response,
            message: `New Favorite game created for user: ${req.body.id_user}`,
            data: newFavorite
        });
    } catch (error) {
        console.error('Error creating Favorite game:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const unmarkAsFavorite = async (req, res) => {
    const cancelFavorite = req.body; // {email} le pasaremos el email por el body
    try {
        const response = await FavoritesModel.unmarkAsFavorite(cancelFavorite);
        if (response) {
            res.status(200).json({
                message: `Favorite was deleted successfully`,
                data: response
            });
        } else {
            res.status(404).json({ error: 'Favorite game was not found' });
        }
    } catch (error) {
        console.error('Error deleting Favorite game:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    getAllFavoritesFromUser,
    markAsFavorite,
    unmarkAsFavorite
}