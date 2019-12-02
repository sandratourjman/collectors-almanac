const express = require("express");
const router = express.Router();
const validation = require("./validation");
const helper = require("../auth/helpers");

const itemController = require("../controllers/itemController");

router.get("/collections/:collectionId/items", itemController.index);
router.get("/collections/:collectionId/items/new", itemController.new);
router.post("/collections/:collectionId/items/create", 
	validation.validateItems,
	helper.ensureAuthenticated, 
	itemController.create);
router.get("/collections/:collectionId/items/:id", itemController.show);
router.post("/collections/:collectionId/items/:id/destroy", itemController.destroy);
router.get("/collections/:collectionId/items/:id/edit", itemController.edit);
router.post("/collections/:collectionId/items/:id/update", itemController.update);

module.exports = router;