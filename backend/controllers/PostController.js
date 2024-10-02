const Post = require("../models/Post");
const User = require("../models/User");

const mongoose = require("mongoose");

const InsertPost = async (req, res) => {
  const { title, post } = req.body;

  const reqUser = req.user;

  const user = await User.findById(reqUser._id);

  // criar post

  const newPost = await Post.create({
    post,
    title,
    userId: user._id,
    userName: user.name,
  });

  // se o post foi criado com sucesso

  if (!newPost) {
    res.status(422).json({
      errors: ["houve um problema"],
    });
    return;
  }
  res.status(200).json(newPost);
};

const deletePosts = async (req, res) => {
  const { id } = req.params;

  const reqUser = req.user;

  try {
    const post = await Post.findById(id);

    // checando se o post existe

    if (!post) {
      res.status(404).json({
        errors: ["foto nao encontrada"],
      });
      return;
    }

    // checando se o post é do usuario

    if (!post.userId.equals(reqUser._id)) {
      res.status(422).json({
        errors: ["ocorreu um erro"],
      });
    }

    await Post.findByIdAndDelete(post._id);

    res
      .status(200)
      .json({ id: post._id, message: "post excluido com sucesso" });
  } catch (error) {
    res.status(404).json({
      errors: ["post nao encontrado"],
    });
    return;
  }
};

// pegando todos os posts

const getAllPosts = async (req, res) => {
  const posts = await Post.find({})
    .sort([["createdBy", -1]])
    .exec();

  return res.status(200).json(posts);
};

// pegando post do usuario

const getUsersPost = async (req, res) => {
  const { id } = req.params;

  const posts = await Post.find({ userId: id })
    .sort([["createdAt", -1]])
    .exec();

  return res.status(200).json(posts);
};

module.exports = {
  InsertPost,
  deletePosts,
  getAllPosts,
  getUsersPost,
};
