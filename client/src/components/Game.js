import React, { useState, useEffect } from "react";
import Tile from "./Tile";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const GameBoard = () => {
  
    const location = useLocation();
    const { username } = location.state;

    const navigate = useNavigate();

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const [tiles, setTiles] = useState(
    shuffle([
      { id: 1, color: "red" },
      { id: 2, color: "blue" },
      { id: 3, color: "green" },
      { id: 4, color: "olive" },
      { id: 5, color: "red" },
      { id: 6, color: "yellow" },
      { id: 7, color: "pink" },
      { id: 8, color: "pink" },
      { id: 9, color: "green" },
      { id: 10, color: "blue" },
      { id: 11, color: "olive" },
      { id: 12, color: "yellow" },
    ])
  );

  const [selectedTileIds, setSelectedTileIds] = useState([]);
  const [matchedTileIds, setMatchedTileIds] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);


  useEffect(() => {
    const checkForMatch = () => {
      const [id1, id2] = selectedTileIds;
      if (id1 && id2) {
        const tile1 = tiles.find((tile) => tile.id === id1);
        const tile2 = tiles.find((tile) => tile.id === id2);
        if (tile1.color === tile2.color) {
          setMatchedTileIds((prevMatchedTileIds) => [
            ...prevMatchedTileIds,
            id1,
            id2,
          ]);
          setScore((prevScore) => prevScore + 10);
        }
        setSelectedTileIds([]);
      }
    };
    checkForMatch();

    if (matchedTileIds.length === tiles.length*2) {
        // Navigate to another component with the username and score data
        console.log("game over");
        setGameOver(true);
    }
  
  }, [selectedTileIds, tiles, matchedTileIds, score , navigate , username]);


const handleTileClick = (id) => {
    if (matchedTileIds.includes(id)) {
      return;
    }
  
    if (selectedTileIds.includes(id)) {
      setSelectedTileIds((prevSelectedTileIds) => prevSelectedTileIds.filter((tileId) => tileId !== id));
      return;
    }
  
    if (selectedTileIds.length === 2) {
      return;
    }
  
    setSelectedTileIds((prevSelectedTileIds) => [...prevSelectedTileIds, id]);
  
    if (selectedTileIds.length === 1) {
      const [prevId] = selectedTileIds;
      const prevTile = tiles.find((tile) => tile.id === prevId);
      const currentTile = tiles.find((tile) => tile.id === id);
  
      if (prevTile.color === currentTile.color) {
        setMatchedTileIds((prevMatchedTileIds) => [
          ...prevMatchedTileIds,
          prevId,
          id,
        ]);
        
      } else {
        setScore((prevScore) => prevScore - 1);
       
      }
    }
  };
  

  const handleRestartClick = () => {
    setTiles((prevTiles) =>
      prevTiles.map((tile) => ({ ...tile, matched: false }))
    );
    setSelectedTileIds([]);
    setMatchedTileIds([]);
    setScore(0);
  };

  const handleViewScoreClick = () => {
    navigate("/gameover", { state: { username, score } });
  };

  return (
    <div className="grid-container">
      <div className="score-container">
        <h1>{username}</h1> <br/>
        <span className="score-text">Score: {score}</span>
        <br/>
        {matchedTileIds.length === tiles.length * 2 && (
            <button className="view-score-button" onClick={handleViewScoreClick}>
                View Score
            </button>
        )}

      </div>
      <div className="game-board" style={{ display: "flex", flexWrap: "wrap" }}>
        {tiles.map(({ id, color }) => (
          <Tile
            key={id}
            id={id}
            color={color}
            matched={matchedTileIds.includes(id)}
            selected={selectedTileIds.includes(id)}
            onClick={() => handleTileClick(id)}
          />
        ))}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "16px",
        }}
      >
        <button className="restart-button" onClick={handleRestartClick}>
          Restart
        </button>
      </div>
    </div>
  );
};

export default GameBoard;        
