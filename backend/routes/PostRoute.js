const express = require("express");
const router = express.Router();

// controller
const {
  InsertPost,
  deletePosts,
  getAllPosts,
  getUsersPost,
} = require("../controllers/PostController");

// middwares
const authGuard = require("../middlewares/AuthGuard");
const validate = require("../middlewares/handleValidator");

const { PostInsertValidation } = require("../middlewares/PostValidation");

// routes
router.post("/", authGuard, PostInsertValidation(), validate, InsertPost);
router.delete("/:id", authGuard, deletePosts);
router.get("/", authGuard, getAllPosts);
router.get("/user/:id", authGuard, getUsersPost);

module.exports = router;
