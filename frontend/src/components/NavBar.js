import "./NavBar.css";

// components
import { NavLink, Link } from "react-router-dom";
import {
  BsSearch,
  BsHouseDoorFill,
  BsFillPersonFill,
  BsPostcard,
} from "react-icons/bs";

// hooks
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const { auth } = useAuth();
  const { user } = useSelector((state) => state.auth);

  return (
    <nav id="nav">
      <Link to={"/"}>Social</Link>
      <form id="search-form">
        <BsSearch />
        <input type="text" placeholder="pesquisar" />
      </form>
      <ul id="nav-links">
        {auth ? (
          <>
            <li>
              <NavLink to={"/"}>
                <BsHouseDoorFill />
              </NavLink>
            </li>
            {user && (
              <li>
                <NavLink to={`/users/${user._id}`}>
                  <BsPostcard />
                </NavLink>
              </li>
            )}
            <li>
              <NavLink to={"/profile"}>
                <BsFillPersonFill />
              </NavLink>
            </li>
            <li>
              <span>Sair</span>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to={"/login"}>Entrar</NavLink>
            </li>
            <li>
              <NavLink to={"/register"}>Cadastrar</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
