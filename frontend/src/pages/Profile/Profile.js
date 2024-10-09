import "./Profile.css";

import Message from "../../components/Message";
import { Link } from "react-router-dom";
import { BsFillEyeFill, BsPencilFill, BsXLg } from "react-icons/bs";

// hooks
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

// redux
import { getUserDetails } from "../../slices/userSlice";
import { publishPost, resetMessage } from "../../slices/PostSlice";

const Profile = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.user);
  const { user: userAuth } = useSelector((state) => state.auth);
  const {
    posts,
    loading: loadingPost,
    message: messagePost,
    error: errorPost,
  } = useSelector((state) => state.post);

  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");

  // novo form e edicao form refs

  const newPostForm = useRef();
  const editPostForm = useRef();

  // carregar dados do user

  useEffect(() => {
    dispatch(getUserDetails(id));
  }, [dispatch, id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const postData = {
      title,
      post,
    };

    console.log(postData);

    dispatch(publishPost(postData)).then((response) => {
      console.log(response); // Verifique se está retornando o que espera
    });

    setTitle("");
    setPost("");

    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

  if (loading) {
    <p>Carregando...</p>;
  }

  return (
    <div id="profile">
      <div className="profile-header">
        <div className="profile-description">
          <h2>{user.name}</h2>
          <p>{user.bio}</p>
        </div>
      </div>
      {id === userAuth._id && (
        <>
          <div className="new-post" ref={newPostForm}>
            <h3>Noque você esta pensando agora?</h3>
            <form onSubmit={handleSubmit}>
              <label>
                <span>Título para o Post</span>
                <input
                  type="text"
                  placeholder="Insira um titulo"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title || ""}
                />
              </label>
              <label>
                <span>Insira o Conteúdo do Post</span>
                <input
                  type="text"
                  placeholder="Insira doque será o Post"
                  onChange={(e) => setPost(e.target.value)}
                  value={post || ""}
                />
              </label>
              {!loadingPost && <input type="submit" value="Postar" />}
              {loadingPost && (
                <input type="submit" disabled value="Aguarde..." />
              )}
            </form>
          </div>
          {errorPost && <Message msg={errorPost} type="error" />}
          {messagePost && <Message msg={messagePost} type="success" />}
        </>
      )}
    </div>
  );
};

export default Profile;
