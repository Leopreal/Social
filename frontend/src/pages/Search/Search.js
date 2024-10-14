import "./Search.css";

// hooks
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";
import { useQuery } from "../../hooks/useQuery";

// components
import LikeContainer from "../../components/LikeContainer";
import PostItem from "../../components/PostItem";
import { Link } from "react-router-dom";

// redux
import { searchPost, like } from "../../slices/PostSlice";

const Search = () => {
  const query = useQuery();

  const search = query.get("q");

  const dispatch = useDispatch();

  const resetMessage = useResetComponentMessage(dispatch);

  const { user } = useSelector((state) => state.auth);
  const { posts, loading } = useSelector((state) => state.post);

  // carregando post

  useEffect(() => {
    dispatch(searchPost(search));
  }, [dispatch, search]);

  const handleLike = (post) => {
    dispatch(like(post._id));

    resetMessage();
  };

  if (loading) {
    <p>Carregando...</p>;
  }

  return (
    <div id="search">
      <h2>Você está buscando por: {search}</h2>
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
    </div>
  );
};

export default Search;
