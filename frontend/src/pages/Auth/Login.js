import "./Auth.css";

// components
import { Link } from "react-router-dom";
import Message from "../../components/Message";

// hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// redux
import { login, reset } from "../../slices/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    dispatch(login(user));
  };

  // limpando os states
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <div id="login">
      <h2>Social</h2>
      <p className="subtitle">Faça login para saber oque há de novo</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
          value={email || ""}
        />
        <input
          type="password"
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
          value={password || ""}
        />
        {!loading && <input type="submit" value={"Entrar"} />}
        {loading && <input type="submit" value={"Aguarde..."} disabled />}
        {error && <Message msg={error} type={"error"} />}
      </form>
      <p>
        Não tem uma conta? <Link to={"/register"}>Clique Aqui</Link>
      </p>
    </div>
  );
};

export default Login;
