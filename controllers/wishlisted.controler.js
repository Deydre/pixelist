const WishlistedModel = require('../models/wishlisted.model'); // Importar el modelo de la BBDD

const getAllWishlistedFromUser = async (req, res) => {
    const email = req.params.email;
    console.log(email)
    try {
        const userData = await WishlistedModel.getAllWishlistedFromUser(email);
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

const markAsWishlisted = async (req, res) => {
    try {
        const newWishlisted = req.body; // {id_user, id_game, date, rating, review}
        const response = await WishlistedModel.markAsWishlisted(newWishlisted);
        res.status(201).json({
            "items_created": response,
            message: `New Wishlisted game created for user: ${req.body.id_user}`,
            data: newWishlisted
        });
    } catch (error) {
        console.error('Error creating Wishlisted game:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const unmarkAsWishlisted = async (req, res) => {
    const cancelWishlisted = req.body; // {email} le pasaremos el email por el body
    try {
        const response = await WishlistedModel.unmarkAsWishlisted(cancelWishlisted);
        if (response) {
            res.status(200).json({
                message: `Wishlisted was deleted successfully`,
                data: response
            });
        } else {
            res.status(404).json({ error: 'Wishlisted game was not found' });
        }
    } catch (error) {
        console.error('Error deleting Wishlisted game:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    getAllWishlistedFromUser,
    markAsWishlisted,
    unmarkAsWishlisted
}