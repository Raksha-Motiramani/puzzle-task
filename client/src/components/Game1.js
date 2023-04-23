// import React, { useState, useEffect } from "react";
// import Tile from "./Tile";
// import LeaderBoard from './LeaderBoard';
// import { useLocation } from "react-router-dom";

// const Game = (props) => {
//   //const location = useLocation();
//   //const { username } = location.state;

//   const shuffle = (array) => {
//     for (let i = 0; i < array.length ; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [array[i], array[j]] = [array[j], array[i]];
//     }
//     return array;
//   };
 

//   const [tiles, setTiles] = useState(
//     shuffle([
//       { id: 1, color: "red" },
//       { id: 2, color: "blue" },
//       { id: 3, color: "green" },
//       { id: 4, color: "olive" },
//       { id: 5, color: "red" },
//       { id: 6, color: "yellow" },
//       { id: 7, color: "pink" },
//       { id: 8, color: "pink" },
//       { id: 9, color: "green" },
//       { id: 10, color: "blue" },
//       { id: 11, color: "olive" },
//       { id: 12, color: "yellow" },
//     ])
//   );

//   const [selectedTileIds, setSelectedTileIds] = useState([]);
//   const [matchedTileIds, setMatchedTileIds] = useState([]);
//   const [score, setScore] = useState(0);

//   useEffect(() => {
//     const checkForMatch = () => {
//       const [id1, id2] = selectedTileIds;
//       if (id1 && id2) {
//         const tile1 = tiles.find((tile) => tile.id === id1);
//         const tile2 = tiles.find((tile) => tile.id === id2);
//         if (tile1.color === tile2.color) {
//           setMatchedTileIds((prevMatchedTileIds) => [
//             ...prevMatchedTileIds,
//             id1,
//             id2,
//           ]);
//           setScore((prevScore) => prevScore + 10);
//         }
//         // else {
//         //     setScore((prevScore) => prevScore - 1);
//         // }
//         setSelectedTileIds([]);
//       }
//     };
//     checkForMatch();
//     // if (matchedTileIds.length === tiles.length) {
//     //     onGameOver(score);
//     // }
  
//   }, [selectedTileIds, tiles, matchedTileIds, score]);

// const handleTileClick = (id) => {
//     if (matchedTileIds.includes(id)) {
//       return;
//     }
  
//     if (selectedTileIds.includes(id)) {
//       setSelectedTileIds((prevSelectedTileIds) => prevSelectedTileIds.filter((tileId) => tileId !== id));
//       return;
//     }
  
//     if (selectedTileIds.length === 2) {
//       return;
//     }
  
//     setSelectedTileIds((prevSelectedTileIds) => [...prevSelectedTileIds, id]);
  
//     if (selectedTileIds.length === 1) {
//       const [prevId] = selectedTileIds;
//       const prevTile = tiles.find((tile) => tile.id === prevId);
//       const currentTile = tiles.find((tile) => tile.id === id);
  
//       if (prevTile.color === currentTile.color) {
//         setMatchedTileIds((prevMatchedTileIds) => [
//           ...prevMatchedTileIds,
//           prevId,
//           id,
//         ]);
//         //setScore((prevScore) => prevScore + 10);
//       } else {
//         setScore((prevScore) => prevScore - 1);
//       }
//     }
//   };
  

//   const handleRestartClick = () => {
//     setTiles((prevTiles) =>
//       prevTiles.map((tile) => ({ ...tile, matched: false }))
//     );
//     setSelectedTileIds([]);
//     setMatchedTileIds([]);
//     setScore(0);
//   };

//   return (
//     <div className="grid-container">
//       <div className="score-container">
//         <span className="score-text">Score: {score}</span>
//       </div>
//       <div className="game-board" style={{ display: "flex", flexWrap: "wrap" }}>
//         {tiles.map(({ id, color }) => (
//           <Tile
//             key={id}
//             id={id}
//             color={color}
//             matched={matchedTileIds.includes(id)}
//             selected={selectedTileIds.includes(id)}
//             onClick={() => handleTileClick(id)}
//           />
//         ))}
//       </div>
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           marginTop: "16px",
//         }}
//       >
//         <button className="restart-button" onClick={handleRestartClick}>
//           Restart
//         </button>
//       </div>
//       {/* <div>
//         <LeaderBoard username={username} score={score}/>
//       </div> */}
//     </div>
//   );
// };

// export default Game;


// ========================================================================================================================================================


import React, { useState, useEffect } from "react";
import Tile from "./Tile";
//import Scoreboard from "./Scoreboard";

const Game = ({ username }) => {
  const [tiles, setTiles] = useState([]);
  const [selectedTileIds, setSelectedTileIds] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    // Initialize the game board
    const colors = ["red", "blue", "green", "yellow", "orange", "purple"];
    const newTiles = [];
    for (let i = 0; i < 36; i += 2) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      newTiles.push({ id: i, color: color });
      newTiles.push({ id: i + 1, color: color });
    }
    setTiles(newTiles.sort(() => Math.random() - 0.5));
  }, []);

  useEffect(() => {
    // Check for game over condition
    if (tiles.length === 0) {
      setGameOver(true);
      fetch("backend-url", {
        method: "POST",
        body: JSON.stringify({ username: username, score: score }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
    }
  }, [tiles, username, score]);

  const handleTileClick = (id) => {
    if (selectedTileIds.length === 1) {
      const [prevId] = selectedTileIds;
      const prevTile = tiles.find((tile) => tile.id === prevId);
      const currentTile = tiles.find((tile) => tile.id === id);

      if (prevTile.color === currentTile.color) {
        setTiles(tiles.filter((tile) => tile.id !== prevId && tile.id !== id));
        setSelectedTileIds([]);
        setScore(score + 10);
      } else {
        setSelectedTileIds([...selectedTileIds, id]);
        setScore(score - 2);
      }
    } else {
      setSelectedTileIds([id]);
    }
  };

  return (
    <div>
      {gameOver ? (
        <h1>Game Over! Your score is {score}</h1>
      ) : (
        <div className="game-board">
          {tiles.map((tile) => (
            <Tile
              key={tile.id}
              id={tile.id}
              color={tile.color}
              onClick={() => handleTileClick(tile.id)}
            />
          ))}
        </div>
      )}
      {/* <Scoreboard username={username} score={score} /> */}
    </div>
  );
};

export default Game;














//   const handleTileClick = (id) => {
//     if (matchedTileIds.includes(id)) {
//       return;
//     }

//     if (selectedTileIds.length === 2) {
//       return;
//     }

//     setSelectedTileIds((prevSelectedTileIds) => [...prevSelectedTileIds, id]);
//     if (selectedTileIds.length === 1) {
//         const [prevId] = selectedTileIds;
//         const prevTile = tiles.find((tile) => tile.id === prevId);
//         const currentTile = tiles.find((tile) => tile.id === id);
    
//         if (prevTile.color === currentTile.color) {
//           setMatchedTileIds((prevMatchedTileIds) => [
//             ...prevMatchedTileIds,
//             prevId,
//             id,
//           ]);
//         }
//       }
//   };