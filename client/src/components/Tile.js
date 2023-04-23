import React from "react";

const Tile = ({ id, color, matched, selected, onClick }) => {
  const tileStyles = {
    width: "100px",
    height: "100px",
    margin: "5px",
    borderRadius: "10px",
    backgroundColor: matched ? "gray" : selected ? color : "black",
    cursor: matched ? "default" : "pointer",
  };

  return (
    <div style={tileStyles} onClick={onClick}>
      {matched ? "" : selected ? <span>X</span> : ""}
    </div>
  );
};

export default Tile;


