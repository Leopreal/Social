const express = require("express");
const router = express.Router();

// controller

const {
  register,
  login,
  getCurrentUser,
  update,
  getUserById,
} = require("../controllers/UserController");

//middlewares
const validate = require("../middlewares/handleValidator");
const {
  userCreateValidator,
  loginValidation,
  userUpdateValidator,
} = require("../middlewares/userValidator");
const authGuard = require("../middlewares/AuthGuard");

// Routes

router.post("/register", userCreateValidator(), validate, register);
router.post("/login", loginValidation(), validate, login);
router.get("/profile", authGuard, getCurrentUser);
router.put("/", authGuard, userUpdateValidator(), validate, update);
router.get("/:id", getUserById);

module.exports = router;
