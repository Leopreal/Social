import "./Post.css";

// components
import Message from "../../components/Message";
import { Link } from "react-router-dom";
import PostItem from "../../components/PostItem";

// hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";

// redux
import { getPost, like } from "../../slices/PostSlice";
import LikeContainer from "../../components/LikeContainer";

const Post = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const resetMessage = useResetComponentMessage(dispatch);

  const { user } = useSelector((state) => state.auth);
  const { post, loading, error, message } = useSelector((state) => state.post);

  // comentarios

  // carregando dados do post

  useEffect(() => {
    dispatch(getPost(id));
  }, [dispatch, id]);

  // like e comentario
  const handleLike = () => {
    dispatch(like(post._id));

    resetMessage();
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="post">
      <PostItem post={post} />
      <LikeContainer post={post} user={user} handleLike={handleLike} />
      <div className="message-container">
        {error && <Message msg={error} type={"error"} />}
        {message && <Message msg={message} type={"success"} />}
      </div>
    </div>
  );
};

export default Post;
