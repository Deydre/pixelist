const CompletedModel = require('../models/completed.model'); // Importar el modelo de la BBDD

const getAllCompletedFromUser = async (req, res) => {
    const email = req.params.email;
    console.log(email)
    try {
        const userData = await CompletedModel.getAllCompletedFromUser(email);
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

const markAsCompleted = async (req, res) => {
    try {
        const newCompleted = req.body; // {id_user, id_game, date, rating, review}
        const response = await CompletedModel.markAsCompleted(newCompleted);
        res.status(201).json({
            "items_created": response,
            message: `New Completed game created for user: ${req.body.id_user}`,
            data: newCompleted
        });
    } catch (error) {
        console.error('Error creating completed game:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const unmarkAsCompleted = async (req, res) => {
    const cancelCompleted = req.body; // {email} le pasaremos el email por el body
    try {
        const response = await CompletedModel.unmarkAsCompleted(cancelCompleted);
        if (response) {
            res.status(200).json({
                message: `Completed was deleted successfully`,
                data: response
            });
        } else {
            res.status(404).json({ error: 'Completed game was not found' });
        }
    } catch (error) {
        console.error('Error deleting completed game:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    getAllCompletedFromUser,
    markAsCompleted,
    unmarkAsCompleted
}