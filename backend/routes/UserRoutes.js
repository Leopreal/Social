const express = require("express");
const router = express.Router();

// controller

const { register, login } = require("../controllers/UserController");

//middlewares
const validate = require("../middlewares/handleValidator");
const {
  userCreateValidator,
  loginValidation,
} = require("../middlewares/userValidator");

// Routes

router.post("/register", userCreateValidator(), validate, register);
router.post("/login", loginValidation(), validate, login);

module.exports = router;
