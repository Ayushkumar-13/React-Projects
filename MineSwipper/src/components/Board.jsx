import React, { useState, useEffect } from "react";
import Cell from "./Cell";

const getEmptyBoard = (rows, cols) =>
  Array(rows).fill().map(() =>
    Array(cols).fill({
      isMine: false,
      isRevealed: false,
      adjacentMines: 0
    })
  );

const getAdjacentCells = (r, c, rows, cols) => {
  const deltas = [-1, 0, 1];
  const neighbors = [];
  for (let dr of deltas) {
    for (let dc of deltas) {
      const nr = r + dr, nc = c + dc;
      if ((dr !== 0 || dc !== 0) && nr >= 0 && nr < rows && nc >= 0 && nc < cols)
        neighbors.push([nr, nc]);
    }
  }
  return neighbors;
};

const placeMines = (board, mines, skipR, skipC) => {
  const newBoard = board.map(row => row.map(cell => ({ ...cell })));
  let planted = 0;
  const rows = board.length, cols = board[0].length;

  while (planted < mines) {
    const r = Math.floor(Math.random() * rows);
    const c = Math.floor(Math.random() * cols);
    if (!newBoard[r][c].isMine && !(r === skipR && c === skipC)) {
      newBoard[r][c].isMine = true;
      planted++;
    }
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (!newBoard[r][c].isMine) {
        const adj = getAdjacentCells(r, c, rows, cols);
        newBoard[r][c].adjacentMines = adj.filter(([ar, ac]) => newBoard[ar][ac].isMine).length;
      }
    }
  }

  return newBoard;
};

const revealCell = (board, r, c, visited = new Set()) => {
  const key = `${r},${c}`;
  if (visited.has(key) || board[r][c].isRevealed) return;
  board[r][c].isRevealed = true;
  visited.add(key);

  if (board[r][c].adjacentMines === 0 && !board[r][c].isMine) {
    const neighbors = getAdjacentCells(r, c, board.length, board[0].length);
    neighbors.forEach(([nr, nc]) => revealCell(board, nr, nc, visited));
  }
};

const Board = ({ rows, cols, mines, onStart, onEnd, gameKey }) => {
  const [board, setBoard] = useState(getEmptyBoard(rows, cols));
  const [minePlaced, setMinePlaced] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    setBoard(getEmptyBoard(rows, cols));
    setMinePlaced(false);
    setGameOver(false);
  }, [gameKey]);

  const handleClick = (r, c) => {
    if (gameOver || board[r][c].isRevealed) return;

    let newBoard = board.map(row => row.map(cell => ({ ...cell })));

    if (!minePlaced) {
      newBoard = placeMines(newBoard, mines, r, c);
      setMinePlaced(true);
      onStart();
    }

    if (newBoard[r][c].isMine) {
      newBoard[r][c].isRevealed = true;
      setGameOver(true);
      onEnd();
      alert("💥 Game Over!");
    } else {
      revealCell(newBoard, r, c);
    }

    setBoard(newBoard);

    const unrevealed = newBoard.flat().filter((c) => !c.isRevealed).length;
    if (unrevealed === mines && !gameOver) {
      setGameOver(true);
      onEnd();
      alert("🎉 You Win!");
    }
  };

  return (
    <div
      className="grid gap-1 mx-auto"
      style={{ gridTemplateColumns: `repeat(${cols}, 3rem)` }}
    >
      {board.map((row, r) =>
        row.map((cell, c) => (
          <Cell key={`${r}-${c}`} cell={cell} onClick={() => handleClick(r, c)} />
        ))
      )}
    </div>
  );
};

export default Board;
