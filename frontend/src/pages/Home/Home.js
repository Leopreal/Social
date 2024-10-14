import "./Home.css";

// componentes
import LikeContainer from "../../components/LikeContainer";

import PostItem from "../../components/PostItem";

import { Link } from "react-router-dom";

//hooks
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";

// redux
import { getPosts, like } from "../../slices/PostSlice";

const Home = () => {
  const dispatch = useDispatch();

  const resetMessage = useResetComponentMessage(dispatch);

  const { user } = useSelector((state) => state.auth);
  const { posts, loading } = useSelector((state) => state.post);

  // carregando todas os posts

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  // like
  const handleLike = (post) => {
    dispatch(like(post._id));

    resetMessage();
  };

  if (loading) {
    <p>Carregando...</p>;
  }

  return (
    <div>
      <div id="home">
        {posts &&
          posts.map((post) => (
            <div key={post._id}>
              <PostItem post={post} />
              <LikeContainer post={post} user={user} handleLike={handleLike} />
              <Link className="btn" to={`/posts/${post._id}`}>
                Ver mais
              </Link>
            </div>
          ))}
        {posts && posts.length === 0 && (
          <h2 className="no-post">
            Ainda não há fotos publicadas,{" "}
            <Link to={`/users/${user.userId}`}>clique aqui</Link> para começar.
          </h2>
        )}
      </div>
    </div>
  );
};

export default Home;
