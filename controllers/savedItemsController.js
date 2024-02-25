const knex = require('knex')(require('../knexfile'));


//finding all saved items for a specific user:
const allSavedItems = async (req, res) => {
  try {
      const userId = req.params.userId;
      const items = await knex("saved_items").where({ user_id: userId });
      if (items.length === 0) {
          // Respond with an empty array if the user has no saved items
          return res.status(404).json({ message: "No saved items found for this user" });
      }
      res.status(200).json(items);
  } catch (error) {
      console.error("Error fetching saved items for user:", error);
      res.status(500).json({ message: "Internal server error" });
  }
};

const addSavedItems = async (req, res) => {
  const userId = req.params.userId; // Extract user ID from URL
  const { category, name, address, phone } = req.body; // Extract item details from request body

  try {
      // Insert new saved item into the database
      const [newSavedItemId] = await knex("saved_items").insert({
          user_id: userId, // Associate the saved item with the user ID
          category: category,
          name: name,
          address: address,
          phone: phone
      }).returning('id'); // Assuming your DB supports 'returning', which returns the id of the inserted item

      const createdSavedItem = await knex("saved_items").where({ id: newSavedItemId }).first();

      res.status(201).json(createdSavedItem);
  } catch (error) {
      console.error('Error adding saved item:', error);
      res.status(500).json({
          message: `Unable to add saved item: ${error}`
      });
  }
};




//finding all saved items for all users:
// const allSavedItems = async (_req, res) => {
//     try {
//       const users = await knex("saved_items");
//       res.status(200).json(users);
//     } catch (err) {
//       console.error("Error fetching users:", error);
//       res.status(500).json({ error: "Internal server error" });
//     }
//   };
// console.log(allSavedItems);




//finding a specific saved item for a specific user:
const findOne = async (req, res) => {
  try {
    // Use both userId and id from the route parameters
    const itemFound = await knex("saved_items")
      .where({ 
        id: req.params.id, // This is the saved item's ID
        user_id: req.params.userId // This is the user's ID, assuming you've named the parameter userId in your route
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


// const addSavedItems = async (req , res) =>{
//   // if (!req.body.category || !req.body.name || !req.body.address || !req.body.phone || !req.body.created_at) {
//   //   return res.status(400).json({
//   //     message: "Please provide all the details",
//   //   });
//   // }

//   try {
//     // const result = await knex("saved_items").insert(req.body);

//     const [newSavedItemId] = await knex("saved_items").insert(req.body);
//     const createdSavedItem = await knex("saved_items").where({ id: newSavedItemId });

//     res.status(201).json(createdSavedItem);
//   } catch (error) {
//     res.status(500).json({
//       message: `Unable to create new item: ${error}`,
//     });
//   }
// };



// delete a specific item for a specific user:
const deleteSavedItem = async (req, res) => {
  const { userId, id } = req.params; // Destructure parameters from the request

  try {
    // First, attempt to find the item to ensure it belongs to the user
    const itemToDelete = await knex("saved_items")
      .where({ 
        id: id,
        user_id: userId
      });

    if (itemToDelete.length === 0) {
      // Item not found or does not belong to the user
      return res.status(404).json({
        message: `Item with ID ${id} for user with ID ${userId} not found or does not belong to the specified user.`
      });
    }

    // Proceed to delete a specific item for a specific user:
    const rowsDeleted = await knex("saved_items")
      .where({ 
        id: id,
        user_id: userId
      })
      .delete();

    if (rowsDeleted) {
      // Successfully deleted
      res.status(204).send(); // No Content response
    } else {
      // Handle unexpected case where deletion did not occur
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

