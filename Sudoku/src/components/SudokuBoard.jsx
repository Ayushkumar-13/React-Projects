import React from 'react';
import { useSudoku } from '../context/SudokuContext';
import '../css/SudokuBoard.css';

export function SudokuBoard() {
  const { board, setCell } = useSudoku();

  return (
    <div className="sudoku-board">
      {board.flatMap((row, r) =>
        row.map((cell, c) => (
          <input
            key={`${r}-${c}`}
            type="text"
            maxLength={1}
            value={cell}
            onChange={(e) => setCell(r, c, e.target.value)}
            className={`cell ${
              (Math.floor(r / 3) + Math.floor(c / 3)) % 2 === 0
                ? 'cell-light'
                : 'cell-dark'
            }`}
          />
        ))
      )}
    </div>
  );
}
