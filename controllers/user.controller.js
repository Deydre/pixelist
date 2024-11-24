const UserModel = require('../models/user.model'); // Importar el modelo de la BBDD
const { validationResult } = require("express-validator");

// Crear usuario //Post

const createUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array(),
            });
        }
        const newUser = req.body; // {username, email, password, avatar, quote}
        const response = await UserModel.createUser(newUser); 
        res.status(201).json({
            "items_created": response,
            message: `User created: ${req.body.email}`,
            username: newUser.username,
            email: newUser.email,
            password: "***********",
            avatar: newUser.avatar,
            quote: newUser.quote
        })
    } catch (error) {
        console.error('Error updating User:', error)
        res.status(500).json({ error: 'Internal server error' })
        next(error)
    }
}

module.exports = {
    createUser,
}