import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/pixelist_logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { context } from "../../../context/context";
import axios from 'axios';

const NavBar = () => {

  const { profile, updateProfile } = useContext(context);

  const handleLogout = async () => {
    try {
      await axios({
        method: 'get',
        url: 'http://localhost:3000/api/user/logout',
        withCredentials: true
      });
      updateProfile("")
    } catch (error) {
      console.log(error.message);
    }
  };

  return <nav id="navBar">
    <ul>
      <li className="nav-link active"><Link to='/'><img src={logo} alt="pixelist logo" /></Link></li>
      <div>
        {profile ? (
          // Si hay perfil mostramos LOGOUT + Icono del perfil
          <>
            <li onClick={handleLogout} className="nav-link active">LOGOUT</li>
            <li className="nav-link active">
              <Link to="/profile/">
                <FontAwesomeIcon icon={faUser} size="sm" />
              </Link>
            </li>
          </>
        ) : (
          // Si no hay perfil mostramos SIGN UP + LOGIN
          <>
            <li className="nav-link active">
              <Link to="/signup">SIGN UP</Link>
            </li>
            <li className="nav-link active">
              <Link to="/login">LOGIN</Link>
            </li>
          </>
        )}
      </div>

    </ul>
  </nav>
};

export default NavBar;
