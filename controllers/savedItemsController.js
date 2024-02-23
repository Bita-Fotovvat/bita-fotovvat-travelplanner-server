const knex = require('knex')(require('../knexfile'));



const index = async (_req, res) => {
    try {
      const users = await knex("saved_items");
      res.status(200).json(users);
    } catch (err) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
console.log(index);



const addSavedItems = async (req , res) =>{
  // if (!req.body.category || !req.body.name || !req.body.address || !req.body.phone || !req.body.created_at) {
  //   return res.status(400).json({
  //     message: "Please provide all the details",
  //   });
  // }

  try {
    // const result = await knex("saved_items").insert(req.body);

    const [newSavedItemId] = await knex("saved_items").insert(req.body);
    const createdSavedItem = await knex("saved_items").where({ id: newSavedItemId });

    res.status(201).json(createdSavedItem);
  } catch (error) {
    res.status(500).json({
      message: `Unable to create new item: ${error}`,
    });
  }
};


module.exports = {
    index,
    addSavedItems,
}

