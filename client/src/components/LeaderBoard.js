import React, { useEffect, useState } from 'react';
import { useLocation , useNavigate } from 'react-router-dom';

function Leaderboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const { username , score } = location.state;
  const [leaderboard, setLeaderboard] = useState([]);

  // Fetch leaderboard data from backend and update leaderboard state
  const updateLeaderboard = async () => {
    const response = await fetch('http://localhost:5000/leaderboard');
    const data = await response.json();
    setLeaderboard(data);
  };

  useEffect(() => {
    updateLeaderboard();
  }, []);

  // Submit user's score to backend when game is over and update leaderboard state
  useEffect(() => {
    if (score !== null) {
      const submitScore = async () => {
        try {
          const response = await fetch('http://localhost:5000/leaderboard', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, score })
          });
          if (!response.ok) {
            throw new Error('Failed to submit score');
          }
          console.log('Score submitted successfully');
          updateLeaderboard();
        } catch (err) {
          console.error(err);
        }
      };
      submitScore();
    }
  }, [username, score]);

  function handleBackToMainPage() {
    navigate('/Mainpage',{ state: { username, score } });
  }


  //   //Fetch leaderboard data from backend
  // useEffect(() => {
  //   async function fetchLeaderboard() {
  //     const response = await fetch('http://localhost:5000/leaderboard');
  //     const data = await response.json();
  //     // Add current user's score to the leaderboard data
  //     if (score !== null) {
  //       data.push({ username, score });
  //     }
  //     // Sort the leaderboard data by score in descending order
  //     data.sort((a, b) => b.score - a.score);
  //     setLeaderboard(data);
  //   }
  //   fetchLeaderboard();
  // }, [score, username]);


  // // Submit user's score to backend when game is over
  // useEffect(() => {
  //   async function submitScore() {
  //     try {
  //       const response = await fetch('http://localhost:5000/leaderboard', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify({ username, score })
  //       });
  //       if (!response.ok) {
  //         throw new Error('Failed to submit score');
  //       }
  //       console.log('Score submitted successfully');
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }
  //   if (score !== null) {
  //     submitScore();
  //   }
  // }, [username, score]);

  // function handleBackToMainPage() {
  //   navigate('/Mainpage',{ state: { username, score } });
  // }

  

  return (  
    <div className="leaderboard-container">
      <h2>Leaderboard</h2>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((player, index) => (
            <tr key={player._id}>
              <td>{index + 1}</td>
              <td>{player.username}</td>
              <td>{player.score}</td>
            </tr>
          ))}
        </tbody>
      </table>  
      <div className="button-container">
      <button className="back-to-main-page-button" onClick={handleBackToMainPage}>Back</button>
      </div>    
    </div>
  );
}

export default Leaderboard;
