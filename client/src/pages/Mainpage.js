import React from "react";
import {  Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import play from '../components/play.jpg';

function Mainpage() {
  const location = useLocation();
  const { username } = location.state || {};

  return (
     <div className="container" style={{backgroundColor:"pink"}}>
      <div className="image-section">
        <img src={play} alt=""/>
      </div>
      <div className="text-section" style={{ display: "flex", flexDirection: "column", backgroundColor:"pink", justifyContent: "center", alignItems: "center", padding: "1rem", borderRadius: "10px" }}>
  <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Welcome, {username}!</h1>
  <Link to="/Game" state={{ username: username}}>
    <button style={{ backgroundColor: "#0077FF", color: "#fff", border: "none", padding: "0.5rem 1rem", borderRadius: "5px", fontSize: "1.2rem", cursor: "pointer" }}>Play</button>
  </Link>
</div>
      {/* <div className="text-section">
      <h1>Welcome, {username}!</h1>
      <Link to="/Game" state={{ username: username}}>
        <button>Play</button>
      </Link>
      </div> */}
    </div>
  );
}

export default Mainpage;