import "./EditProfile.css";

// hooks
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// redux
import { profile, resetMessage, updateProfile } from "../../slices/userSlice";

// componentes
import Message from "../../components/Message";

const EditProfile = () => {
  const dispatch = useDispatch();

  const { user, message, error, loading } = useSelector((state) => state.user);

  // states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");

  // carregas dados do user

  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  // completar o form com os dados
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setBio(user.bio);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // pegar dados do user
    const userData = {
      name,
    };

    if (bio) {
      userData.bio = bio;
    }

    if (password) {
      userData.password = password;
    }


    await dispatch(updateProfile(userData));

    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

  return (
    <div id="edit-profile">
      <h2>Edite seu Perfil</h2>
      <p className="subtitle">Personalize o seu usuario!</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          onChange={(e) => setName(e.target.value)}
          value={name || ""}
        />
        <input type="text" placeholder="E-mail" disabled value={email || ""} />
        <label>
          <span>Bio: </span>
          <input
            type="text"
            placeholder="Descrição"
            onChange={(e) => setBio(e.target.value)}
            value={bio || ""}
          />
        </label>
        <label>
          <span>Quer alterar a sua senha?</span>
          <input
            type="password"
            placeholder="Digite sua nova senha"
            onChange={(e) => setPassword(e.target.value)}
            value={password || ""}
          />
        </label>
        {!loading && <input type="submit" value={"Atualizar"} />}
        {loading && <input type="submit" value={"Aguarde..."} disabled />}
        {error && <Message msg={error} type={"error"} />}
        {message && <Message msg={message} type={"success"} />}
      </form>
    </div>
  );
};

export default EditProfile;
