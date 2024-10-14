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
import { getPost, like, comment } from "../../slices/PostSlice";
import LikeContainer from "../../components/LikeContainer";

const Post = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const resetMessage = useResetComponentMessage(dispatch);

  const { user } = useSelector((state) => state.auth);
  const { post, loading, error, message } = useSelector((state) => state.post);

  // comentarios
  const [commentText, setCommentText] = useState("");

  // carregando dados do post

  useEffect(() => {
    dispatch(getPost(id));
  }, [dispatch, id]);

  // like
  const handleLike = () => {
    dispatch(like(post._id));

    resetMessage();
  };

  // inserir comentario
  const handleComment = (e) => {
    e.preventDefault();

    const commentData = {
      comment: commentText,
      id: post._id,
    };

    dispatch(comment(commentData));

    setCommentText("");

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
      <div className="comments">
        {post.comments && (
          <>
            <h3>Comentários: {post.comments.length}</h3>
            <form onSubmit={handleComment}>
              <input
                type="text"
                placeholder="Insira aqui seu comentário"
                onChange={(e) => setCommentText(e.target.value)}
                value={commentText || ""}
              />
              <input type="submit" value="Enviar" />
            </form>
            {post.comments.length === 0 && <p>Não há comentários</p>}
            {post.comments.map((comment) => (
              <div className="comment" key={comment.comment}>
                <div className="author">
                  <Link to={`/users/${comment.userId}`}>
                    <p>{comment.userName}</p>
                  </Link>
                </div>
                <p>{comment.comment}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Post;
