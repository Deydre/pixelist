import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/pixelist_logo.png"

const NavBar = () => {
  return <nav id="navBar">
    <ul>
      <li className="nav-link active"><Link to='/'><img src={logo} alt="pixelist logo" /></Link></li>
      <div>
        <li className="nav-link active"><Link to='/signup'>SIGN UP</Link></li>
        <li className="nav-link active"><Link to='/login'>LOGIN</Link></li>
      </div>

    </ul>
  </nav>
};

export default NavBar;