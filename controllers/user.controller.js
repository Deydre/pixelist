const UserModel = require('../models/user.model'); // Importar el modelo de la BBDD
const { createToken } = require('../config/jsonWebToken');
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


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("EMAIL")
        console.log(email)
        const user = await UserModel.login(email, password);
        if (user) {
            const token = createToken({ email: user.email });
            res.status(200)
                .set('Authorization', `Bearer ${token}`)
                .cookie('access_token', token, {
                    // httpOnly: true,  // Evita que la cookie sea accesible mediante JavaScript (seguridad)
                    // secure: true,  // Se envía también en HTTP
                  })
                .json({ email: user.email })
                .send()
        } else {
            res.status(400).json({ msg: "wrong credentials" });
        }

    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};


const getAllUsers = async (req, res) => {
    let users;
    users = await UserModel.getAllUsers();

    res.status(200).json(users);
}

const getUserByEmail = async (req, res) => {
    const { email } = req.query;
    try {
        const userData = await UserModel.getUserByEmail(email);
        if (userData && userData.length > 0) {
            res.status(200).json(userData);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error obtaining user by email:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const updateUserByEmail = async (req, res) => {
    const { email } = req.query;
    const updatedUserData = req.body;
    try {
        const response = await UserModel.updateUserByEmail(updatedUserData, email);
        if (response === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({
            message: `User updated: ${email}`,
            username: updatedUserData.username,
            email: updatedUserData.email,
            password: "***********",
            avatar: updatedUserData.avatar,
            quote: updatedUserData.quote
        });

    } catch (error) {
        console.error('Error updating User:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const deleteUserByEmail = async (req, res) => {
    const { email } = req.query; // {email} le pasaremos el email por el body
    try {
        const response = await UserModel.deleteUserByEmail(email);
        if (response) {
            res.status(200).json({
                message: `User: ${email} was deleted successfully`,
                data: response
            });
        } else {
            res.status(404).json({ error: 'User with that email was not found' });
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    createUser,
    login,
    getAllUsers,
    getUserByEmail,
    updateUserByEmail,
    deleteUserByEmail
}