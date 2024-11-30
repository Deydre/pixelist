import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/pixelist_logo.png"
import { context } from "../../../context/context";
import axios from 'axios';

const NavBar = () => {

  const { updateLogged, updateActualUser } = useContext(context);

  const handleLogout = async () => {
    try {
      await axios({
        method: 'get',
        url: 'http://localhost:3000/api/user/logout',
        withCredentials: true
      });
      updateLogged(false);
      updateActualUser("")
    } catch (error) {
      console.log(error.message);
    }
  };

  return <nav id="navBar">
    <ul>
      <li className="nav-link active"><Link to='/'><img src={logo} alt="pixelist logo" /></Link></li>
      <div>
        <li className="nav-link active"><Link to='/signup'>SIGN UP</Link></li>
        <li className="nav-link active"><Link to='/login'>LOGIN</Link></li>
        <li className="nav-link active"><button onClick={handleLogout}>LOGOUT</button></li>
      </div>

    </ul>
  </nav>
};

export default NavBar;
