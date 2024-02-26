const knex = require('knex')(require('../knexfile'));

const findOne = async (req, res) => {
    try {
      const usersFound = await knex("users")
        .where({ id: req.params.id });
      if (usersFound.length === 0) {
        return res.status(404).json({
          message: `User with ID ${req.params.id} not found` 
        });
      }
      const userData = usersFound[0];
      res.json(userData);
    } catch (error) {
      res.status(500).json({
        message: `Unable to retrieve user data for user with ID ${req.params.id}`,
      });
    }
  };
  const savedFavs = async (req, res) => {
    try {
      const savedFavs = await knex("users")
        .join("saved_items", "saved_items.user_id", "users.id")
        .where({ user_id: req.params.id });
  
      res.json(savedFavs);
    } catch (error) {
      res.status(500).json({
        message: `Unable to retrieve items for user with ID ${req.params.id}: ${error}`,
      });
    }
  };
  
  module.exports = {
    findOne,
    savedFavs,
}