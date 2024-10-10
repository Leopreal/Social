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
import {
  publishPost,
  resetMessage,
  getUserPosts,
  deletePost,
  updatePost,
} from "../../slices/PostSlice";

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
  const [editId, setEditId] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editPost, setEditPost] = useState("");

  // novo form e edicao form refs

  const newPostForm = useRef();
  const editPostForm = useRef();

  // carregar dados do user

  useEffect(() => {
    dispatch(getUserDetails(id));
    dispatch(getUserPosts(id));
  }, [dispatch, id]);

  const resetComponentMessage = () => {
    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

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

    resetComponentMessage();
  };

  // funcao deletar post
  const handleDelete = (id) => {
    dispatch(deletePost(id));

    resetComponentMessage();
  };

  if (loading) {
    <p>Carregando...</p>;
  }

  // mostrar ou esconder form
  const hideOrShowForms = () => {
    newPostForm.current.classList.toggle("hide");
    editPostForm.current.classList.toggle("hide");
  };

  // update post
  const handleUpdate = (e) => {
    e.preventDefault();

    const postData = {
      title: editTitle,
      post: editPost,
      id: editId,
    };

    dispatch(updatePost(postData));

    resetComponentMessage();
  };

  // abrindo form de edicao
  const handleEdit = (post) => {
    if (editPostForm.current.classList.contains("hide")) {
      hideOrShowForms();
    }

    setEditId(post.id);
    setEditTitle(post.title);
    setEditPost(post.post);
  };

  const handleCancelEdit = () => {
    hideOrShowForms();
  };

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
          <div className="edit-post hide" ref={editPostForm}>
            <p>Editando</p>
            <form onSubmit={handleUpdate}>
              <span>Título para o Post</span>
              <input
                type="text"
                onChange={(e) => setEditTitle(e.target.value)}
                value={editTitle || ""}
              />
              <span>Insira o Conteúdo do Post</span>
              <input
                type="text"
                onChange={(e) => setEditPost(e.target.value)}
                value={editPost || ""}
              />
              <input type="submit" value="Atualizar" />
              <button className="cancel-btn" onClick={handleCancelEdit}>
                Cancelar Edição
              </button>
            </form>
          </div>
          {errorPost && <Message msg={errorPost} type="error" />}
          {messagePost && <Message msg={messagePost} type="success" />}
        </>
      )}
      <div className="user-posts">
        <h2>Posts Publicados</h2>
        <div className="posts-container">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post._id} className="post">
                <h3>{post.title}</h3>
                <p>{post.post}</p>
                {id === userAuth._id ? (
                  <div className="actions">
                    <Link to={`/posts/${post._id}`} className="view-post">
                      Ver Mais
                      <BsFillEyeFill />
                    </Link>
                    <BsPencilFill
                      className="icon edit-icon"
                      onClick={() => handleEdit(post)}
                    />
                    <BsXLg
                      className="icon delete-icon"
                      onClick={() => handleDelete(post._id)}
                    />
                  </div>
                ) : (
                  <Link className="btn" to={`/posts/${post._id}`}>
                    Ver
                  </Link>
                )}
              </div>
            ))
          ) : (
            <p>Este usuário ainda não publicou nenhum post.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
