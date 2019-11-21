const express = require("express");
const router = express.Router();
const validation = require("./validation");
const helper = require("../auth/helpers");

const collectionController = require("../controllers/collectionController");

router.get("/collections", collectionController.index);
router.get("/collections/new", collectionController.new);
router.post("/collections/create", 
	validation.validateCollections,
	helper.ensureAuthenticated, 
	collectionController.create);
router.get("/collections/:id", collectionController.show);
router.post("/collections/:id/destroy", collectionController.destroy);
router.get("/collections/:id/edit", collectionController.edit);
router.post("/collections/:id/update", collectionController.update);

module.exports = router;