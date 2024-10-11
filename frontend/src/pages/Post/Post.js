import "./Post.css";

// components
import Message from "../../components/Message";
import { Link } from "react-router-dom";
import PostItem from "../../components/PostItem";

// hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

// redux
import { getPost } from "../../slices/PostSlice";

const Post = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { post, loading, error, message } = useSelector((state) => state.post);

  // comentarios

  // carregando dados do post

  useEffect(() => {
    dispatch(getPost(id));
  }, [dispatch, id]);

  // like e comentario

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="post">
      <PostItem post={post} />
    </div>
  );
};

export default Post;
