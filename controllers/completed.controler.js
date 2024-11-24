const pool = require('../config/db_pgSQL');
const queries = require('../utils/completedQueries') // Queries SQL

// const getAllFavoritesFromUser = async (req, res) => {
//     const id = req.params.id;
//     console.log(id)
//     try {
//         const userData = await User.getAllFavoritesFromUser(id);
//         if (userData) {
//             res.status(200).json(userData);
//         } else {
//             res.status(404).json({ error: 'User not found' });
//         }
//     } catch (error) {
//         console.error('Error obtaining favorites by email:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// }
// const markAsFavorite = async (req, res) => {
//     //mongo_id y mongo_title van a venir de un fetch, user_id viene del login(?)
//     const newFavorite = req.body; // {user_id,mongo_title,mongo_id}
//     const response = await User.markAsFavorite(newFavorite);
//     res.status(201).json({
//         "items_created": response,
//         message: `New Favorite created for user: ${req.body.user_id}`,
//         data: newFavorite
//     });
// }
// const unmarkAsFavorite = async (req, res) => {
//     const favorite_id = req.params.favorite_id; // {email} le pasaremos el email por el body
//     try {
//         const response = await User.unmarkAsFavorite(favorite_id);
//         if (response) {
//             res.status(200).json({
//                 message: `favorite was deleted successfully`,
//                 data: response
//             });
//         } else {
//             res.status(404).json({ error: 'favorite was not found' });
//         }
//     } catch (error) {
//         console.error('Error deleting user:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// }
