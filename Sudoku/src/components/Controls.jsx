import React from 'react';
import { useSudoku } from '../context/SudokuContext';
import '../css/Controls.css';

export function Controls() {
  const { solveSudoku, resetBoard } = useSudoku();

  return (
    <div className="controls">
      <button onClick={solveSudoku}>Solve Sudoku</button>
      <button onClick={resetBoard}>Reset Board</button>
    </div>
  );
}
