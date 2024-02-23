const router = require('express').Router();
const savedItemsController = require('../controllers/savedItemsController');

// // POST route to create a new saved item
// router.post('/users/:userId/saved-items', savedItemsController.createSavedItem);

// GET route to fetch all saved items for a user
router.get("/", savedItemsController.index);
router.post("/", savedItemsController.addSavedItems);
// router.post('/:userId/saved-items', savedItemsController.addSavedItems);

// // // DELETE route to delete a saved item
// router.delete('/saved-items/:itemId', savedItemsController.deleteSavedItem);

// // // PUT route to update a saved item
// router.put('/saved-items/:itemId', savedItemsController.updateSavedItem);

module.exports = router;
