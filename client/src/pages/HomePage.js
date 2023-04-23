import React from "react";
import img from '../components/img.jpg';

function HomePage() {
  return (
    <div class="container">
  <div class="image-section">
    <img src={img} />
  </div>
  <div class="text-section">
    <h1>Welcome to <span style={{color:"darkred", fontSize:"largest"}}>Memopuzzle</span></h1>
    <p style={{fontSize:"20px" , fontWeight:"bold"}}>Step up to the challenge with MemoPuzzle - </p>
    <p style={{fontSize:"20px" , fontWeight:"initial"}}>the game that tests your memory, your concentration, and your strategic thinking!</p>
    <br />
    <p style={{fontSize:"18px"}}>First <span style={{fontWeight:"bold"}}>Register</span> yourself and then <span style={{fontWeight:"bold"}}>Login </span>to get boosting experience</p>
  </div>
</div>
  );
}

export default HomePage;