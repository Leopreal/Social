const express = require("express");
const router = express.Router();

// controller
const {
  InsertPost,
  deletePosts,
  getAllPosts,
  getUsersPost,
  getPostById,
  updatePost,
  likePost,
  commentPost,
  searchPosts,
} = require("../controllers/PostController");

// middwares
const {
  PostInsertValidation,
  PostUpdateValidation,
  CommentValidator,
} = require("../middlewares/PostValidation");
const authGuard = require("../middlewares/AuthGuard");
const validate = require("../middlewares/handleValidator");

// routes
router.post("/", authGuard, PostInsertValidation(), validate, InsertPost);
router.delete("/:id", authGuard, deletePosts);
router.get("/", authGuard, getAllPosts);
router.get("/user/:id", authGuard, getUsersPost);
router.get("/search", authGuard, searchPosts);
router.get("/:id", authGuard, getPostById);
router.put("/:id", authGuard, PostUpdateValidation(), validate, updatePost);
router.put("/like/:id", authGuard, likePost);
router.put(
  "/comment/:id",
  authGuard,
  CommentValidator(),
  validate,
  commentPost
);

module.exports = router;
