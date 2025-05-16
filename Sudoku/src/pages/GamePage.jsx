import React from 'react';
import { SudokuBoard } from '../components/SudokuBoard';
import { Controls } from '../components/Controls';
import '../css/GamePage.css';

export default function GamePage() {
  return (
    <div className="game-page">
      <h1>Sudoku Solver & Player Game</h1>
      <SudokuBoard />
      <Controls />
    </div>
  );
}
