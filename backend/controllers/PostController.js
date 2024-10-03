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

// pegando post pelo id
const getPostById = async (req, res) => {
  const { id } = req.params;

  const post = await Post.findById(id);

  // checando se a foto n existir

  if (!post) {
    res.status(200).json({ errors: ["post nao encontrado"] });
    return;
  }

  res.status(200).json(post);
};

// atualizar o post

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, post } = req.body;

  const reqUser = req.user;

  const opost = await Post.findById(id);

  // checando se o post existe

  if (!opost) {
    res.status(404).json({ errors: ["foto nao encontrada"] });
    return;
  }

  if (!opost.userId.equals(reqUser._id)) {
    res.status(422).json({ errors: ["ocorreu um erro"] });
    return;
  }

  if (title) {
    opost.title = title;
  }

  if (post) {
    opost.post = post;
  }

  await opost.save();

  res.status(200).json({ opost, message: "post atualizado" });
};

// funcionalidade like

const likePost = async (req, res) => {
  const { id } = req.params;

  const reqUser = req.user;

  const post = await Post.findById(id);

  // checando se o post existe

  if (!post) {
    res.status(404).json({ errors: ["post nao encontrado"] });
    return;
  }

  // checando se o post ja foi curtido

  if (post.likes.includes(reqUser._id)) {
    res.status(422).json({ errors: ["voce ja curtiu o post"] });
    return;
  }

  // colocar o id do usuario no array de likes

  post.likes.push(reqUser._id);

  post.save();

  res
    .status(200)
    .json({ postId: id, userId: reqUser._id, message: "post curtido" });
};

// funcionalidade de comentarios

const commentPost = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;

  const reqUser = req.user;

  const user = await User.findById(reqUser._id);

  const post = await Post.findById(id);

  if (!post) {
    res.status(404).json({ errors: ["post nao encontrado"] });
    return;
  }

  // colocando comentario

  const userComment = {
    comment,
    userName: user.name,
    userId: user._id,
  };

  post.comments.push(userComment);

  await post.save();

  res.status(200).json({
    comment: userComment,
    message: "comentario adicionado",
  });
};

// buscando post pelo titulo
const searchPosts = async (req, res) => {
  const { q } = req.query;

  const posts = await Post.find({ title: new RegExp(q, "i") }).exec();

  res.status(200).json(posts);
};

module.exports = {
  InsertPost,
  deletePosts,
  getAllPosts,
  getUsersPost,
  getPostById,
  updatePost,
  likePost,
  commentPost,
  searchPosts,
};
