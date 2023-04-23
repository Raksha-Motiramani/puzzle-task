import React from "react";
import { Link , useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  function handleLogout() {
    // Perform any necessary logout logic here, such as clearing local storage or cookies
    navigate('/register');
  }

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Memopuzzle</Link>
      </div>
      <ul className="navbar-menu">
        <li className="navbar-item">
          <Link to="/login">Login</Link>
        </li>
        <li className="navbar-item">
          <Link to="/register">Register</Link>
        </li>
        <li className="navbar-item">
          <a href="#" onClick={handleLogout}>Logout</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
