const express = require("express");
const router = express.Router();
const helper = require("../auth/helpers");

const itemController = require("../controllers/itemController");

// router.get("/items", itemController.index);
// router.get("/items/new", itemController.new);
// router.post("/items/create", helper.ensureAuthenticated, itemController.create);
// router.get("/items/:id", itemController.show);
// router.post("/items/:id/destroy", itemController.destroy);
// router.get("/items/:id/edit", itemController.edit);
// router.post("/items/:id/update", itemController.update);

module.exports = router;