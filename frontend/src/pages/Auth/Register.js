import "./Auth.css";

// components
import { Link } from "react-router-dom";
import Message from "../../components/Message";

// hooks
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// redux
import { register, reset } from "../../slices/authSlice";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPasswor] = useState("");

  const dispatch = useDispatch(); // deixa usar as funcoes do redux

  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
      confirmPassword,
    };

    console.log(user);

    dispatch(register(user));
  };

  // reseta os states
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <div id="register">
      <h2>Social</h2>
      <p className="subtitle">Cafastre-se para ver os posts dos seus amigos!</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          onChange={(e) => setName(e.target.value)}
          value={name || ""}
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email || ""}
        />
        <input
          type="password"
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
          value={password || ""}
        />
        <input
          type="password"
          placeholder="Confirmar Senha"
          onChange={(e) => setConfirmPasswor(e.target.value)}
          value={confirmPassword || ""}
        />
        {!loading && <input type="submit" value={"Cadastrar"} />}
        {loading && <input type="submit" value={"Aguarde..."} disabled />}
        {error && <Message msg={error} type={"error"} />}
      </form>
      <p>
        Já tem uma conta? <Link to={"/login"}>Clique aqui</Link>
      </p>
    </div>
  );
};

export default Register;
