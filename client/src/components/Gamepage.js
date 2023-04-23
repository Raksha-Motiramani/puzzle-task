import React from "react";
import { useLocation , Link } from "react-router-dom";
import win from "./win.jpg"

const Gamepage = () => {
  const location = useLocation();
  return (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundImage: `url(${win})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        <div  style={{
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: '20px',
        borderRadius: '10px',
        textAlign: 'center'}}>
          <h2 style={{fontSize:"35px" , color:"maroon"}}>Congratulations {location.state.username} !!!</h2>
          <h2 style={{fontSize:"28px"}}>Your score is {location.state.score}</h2>
          <p style={{fontSize:"18px" , color:"darkviolet" , fontWeight:"bold"}}>Good luck with your next game!</p>
      </div>
        <Link to="/leaderboard" state={{ username: location.state.username , score: location.state.score}}>
          <button style={{ fontSize:"20px", margin: '10px' , backgroundColor:"goldenrod" , borderRadius:"4px" , padding:"6px" , border:"none" , cursor:"pointer"}}>View Leaderboard</button>
        </Link>
        <Link to="/Game" state={{ username: location.state.username}}>
          <button style={{ fontSize:"20px", margin: '10px' , backgroundColor:"goldenrod" , borderRadius:"4px" , padding:"6px" , border:"none" , cursor:"pointer" }}>Play Again</button>
        </Link>
      </div>
  );
};

export default Gamepage;
