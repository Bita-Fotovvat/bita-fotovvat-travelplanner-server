const router = require('express').Router();
const savedItemsController = require('../controllers/savedItemsController');
router.get("/:userId", savedItemsController.allSavedItems);
router.post("/:userId", savedItemsController.addSavedItems);
router.get("/:userId/:id", savedItemsController.findOne);
router.delete("/:userId/:id", savedItemsController.deleteSavedItem);
module.exports = router;