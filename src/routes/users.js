const express = require("express");
const router = express.Router();
const expressValidator = require('express-validator');
const validation = require("./validation");

const userController = require("../controllers/userController");

router.get("/users/sign_up", userController.signUp);
router.post("/users/sign_up", validation.validateUsers, userController.create);

module.exports = router;