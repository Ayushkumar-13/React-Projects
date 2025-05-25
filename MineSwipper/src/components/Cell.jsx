import React from "react";

const Cell = ({ cell, onClick }) => {
  const content = () => {
    if (!cell.isRevealed) return "";
    if (cell.isMine) return "💣";
    return cell.adjacentMines > 0 ? cell.adjacentMines : "";
  };

  return (
    <button
      onClick={onClick}
      className={`w-12 h-12 text-lg font-bold flex items-center justify-center border border-gray-500 rounded 
        ${cell.isRevealed ? "bg-gray-100 text-black" : "bg-gray-800 hover:bg-gray-700"}
      `}
    >
      {content()}
    </button>
  );
};

export default Cell;
