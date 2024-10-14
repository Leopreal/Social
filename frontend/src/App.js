import "./App.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// hooks
import { useAuth } from "./hooks/useAuth";

// pages
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import EditProfile from "./pages/EditProfile/EditProfile";
import Profile from "./pages/Profile/Profile";
import Post from "./pages/Post/Post";
import Search from "./pages/Search/Search";

function App() {
  const { auth, loading } = useAuth();

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={auth ? <Home /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/profile"
            element={auth ? <EditProfile /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/users/:id"
            element={auth ? <Profile /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/login"
            element={!auth ? <Login /> : <Navigate to={"/"} />}
          />
          <Route
            path="/register"
            element={!auth ? <Register /> : <Navigate to={"/"} />}
          />
          <Route
            path="/search"
            element={auth ? <Search /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/posts/:id"
            element={auth ? <Post /> : <Navigate to={"/login"} />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
