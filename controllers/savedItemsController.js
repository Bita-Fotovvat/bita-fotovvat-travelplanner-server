const knex = require('knex')(require('../knexfile'));

const index = async (_req, res) => {
    try {
      const users = await knex("users").select("*");
      res.status(200).json(users);
    } catch (err) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
console.log(index);

//   const addSavedItems = async (req, res) => {
//     const {
//       item_name,
//     } = req.body;
  
//     const requiredFields = [
//       "item_name",
//     ];
  
//     const missingField = requiredFields.filter((field) => !req.body[field]);
  
//     if (missingField.length > 0) {
//       return res
//         .status(400)
//         .send({
//             isSuccessful : false,
//             message : `can't create new item as the required fields are missing:  ${missingField}`
//           });
//     }
  
  
//     const newItem = {
//       item_name,
//     };
//     try {
//       const result = await knex("savedItems").insert(newsavedItems);
//       const newWarehouseId = result[0];
//       const createdsavedItems = await knex("wsavedItems").where({
//         id: newSavedItems,
//       });
//       if(createdSavedItems && createdSavedItems!== null){
//         return res.send({
//           message: `Item  was successfully created`,
//           isSuccessful: true,
//           data: createdSavedItems,
//         });
//       }else{
//         return res(500).send({
//           message: `Something went wrong`,
//           isSuccessful: false,
//         });
//       }
      
//     } catch (error) {
//       res.status(500).json({
//         message: `Unable to create new item: ${error}`,
//       });
//     }
//   };


















// const createSavedItem = async (req, res) => {
//     try {
//         const data = await knex('saved-items');
//         res.status(200).json(data);
//       } catch(err) {
//         res.status(400).send(`Error retrieving saved items: ${err}`)
//       }
// };

//find one by id
// const findOne = async (req, res) => {
//     try {
//         const savedItem = await knex('saved-items')
//             .where({ id: req.params.id })
//             .first();
        
//             if (!savedItem) {
//                 return res.status(404).json({
//                     message: `User with ID ${req.params.id} not found` 
//                 });
//             }
//         res.json(savedItem);
//     } catch (error) {
//         res.status(500).json({
//             message: 'Error'
//         })
//     }
// }

// get user's posts
// const posts = async (req, res) => {
//     try {
//         const posts = await knex('user')
//             .join("post", "post.user_id", "user.id")
//         console.log(posts)
//             .where({ user_id: req.params.id });

//         //handle empty array 
//         res.json(posts);
//     } catch (error) {
//         res.status(500).json({
//             message: 'No posts for you :(',
//         });
//     }
// }

// const add = async (req, res) => {
//     if (!req.body.name || !req.body.email) {
//         return res.status(400).json({
//             message: 'Bad request',
//         });
//     }

//     try {
//         //equivalent to newUserid = result[0]
//         const [newUserId] = await knex("user").insert(req.body);

//         const createdUser = await knex("user")
//             .where({ id: newUserId })
//             .first();

//         res.status(201).json(createdUser);
//     } catch (error) {
//         res.status(500).json({
//             message: "Oh no :(",
//         });
//     }
// }

// const update = async (req, res) => {
//     try {
//       const rowsUpdated = await knex("user")
//         .where({ id: req.params.id })
//         .update(req.body);
  
//       if (rowsUpdated === 0) {
//         return res.status(404).json({
//           message: `User with ID ${req.params.id} not found` 
//         });
//       }
  
//       const updatedUser = await knex("user")
//         .where({
//           id: req.params.id,
//         });
      
//       res.json(updatedUser[0]);
//     } catch (error) {
//       res.status(500).json({
//         message: `Unable to update user with ID ${req.params.id}: ${error}` 
//       });
//     }
//   };

//   const remove = async (req, res) => {
//     try {
//       const rowsDeleted = await knex("user")
//         .where({ id: req.params.id })
//         .delete();
  
//       if (rowsDeleted === 0) {
//         return res
//           .status(404)
//           .json({ message: `User with ID ${req.params.id} not found` });
//       }
  
//       // No Content response
//       res.sendStatus(204);
//     } catch (error) {
//       res.status(500).json({
//         message: `Unable to delete user: ${error}`
//       });
//     }
//   };
  

module.exports = {
    index,
    addSavedItems,
    // createSavedItem,
    // findOne,
    // posts,
    // add,
    // update,
    // remove
}

