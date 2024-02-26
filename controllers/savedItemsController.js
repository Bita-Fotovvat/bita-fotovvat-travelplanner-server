const knex = require('knex')(require('../knexfile'));

const allSavedItems = async (req, res) => {
  try {
      const userId = req.params.userId;
      const items = await knex("saved_items").where({ user_id: userId });
      if (items.length === 0) {
          return res.status(404).json({ message: "No saved items found for this user" });
      }
      res.status(200).json(items);
  } catch (error) {
      console.error("Error fetching saved items for user:", error);
      res.status(500).json({ message: "Internal server error" });
  }
};
const addSavedItems = async (req, res) => {
  const userId = req.params.userId;
  const { category, name, address, phone } = req.body;
  try {
      const [newSavedItemId] = await knex("saved_items").insert({
          user_id: userId,
          category: category,
          name: name,
          address: address,
          phone: phone
      }).returning('id');
      const createdSavedItem = await knex("saved_items").where({ id: newSavedItemId }).first();
      res.status(201).json(createdSavedItem);
  } catch (error) {
      console.error('Error adding saved item:', error);
      res.status(500).json({
          message: `Unable to add saved item: ${error}`
      });
  }
};
const findOne = async (req, res) => {
  try {
    const itemFound = await knex("saved_items")
      .where({ 
        id: req.params.id,
        user_id: req.params.userId
      });
    if (itemFound.length === 0) {
      return res.status(404).json({
        message: `Item with ID ${req.params.id} for user with ID ${req.params.userId} not found`
      });
    }
    const itemData = itemFound[0];
    res.json(itemData);
  } catch (error) {
    res.status(500).json({
      message: `Unable to retrieve item data for ID ${req.params.id}: ${error}`,
    });
  }
};
const deleteSavedItem = async (req, res) => {
  const { userId, id } = req.params;
  try {
    const itemToDelete = await knex("saved_items")
      .where({ 
        id: id,
        user_id: userId
      });
    if (itemToDelete.length === 0) {
      return res.status(404).json({
        message: `Item with ID ${id} for user with ID ${userId} not found or does not belong to the specified user.`
      });
    }
    const rowsDeleted = await knex("saved_items")
      .where({ 
        id: id,
        user_id: userId
      })
      .delete();
    if (rowsDeleted) {
      res.status(204).send();
    } else {
      res.status(500).json({
        message: "Failed to delete the item."
      });
    }
  } catch (error) {
    console.error("Error deleting saved item:", error);
    res.status(500).json({
      message: `Unable to delete item: ${error}`
    });
  }
};

module.exports = {
  allSavedItems,
    findOne,
    addSavedItems,
    deleteSavedItem,
}