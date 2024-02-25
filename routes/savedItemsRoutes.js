const router = require('express').Router();
const savedItemsController = require('../controllers/savedItemsController');

// // POST route to create a new saved item
// router.post('/users/:userId/saved-items', savedItemsController.createSavedItem);

// GET route to fetch all saved items for all users
// router.get("/:userId", savedItemsController.allSavedItems);

//get all saved items for a specific user:*******
router.get("/:userId", savedItemsController.allSavedItems);

//add a saved item for a specific user:*******
router.post("/:userId", savedItemsController.addSavedItems);


router.post("/:userId", savedItemsController.addSavedItems);


router.get("/:userId/:id", savedItemsController.findOne);
// DELETE a specific saved item for a specific user
router.delete("/:userId/:id", savedItemsController.deleteSavedItem);

module.exports = router;
