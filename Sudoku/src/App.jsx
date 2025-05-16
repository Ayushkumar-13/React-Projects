import React from 'react';
import { SudokuProvider } from './context/SudokuContext';
import GamePage from './pages/GamePage';

export default function App() {
  return (
    <SudokuProvider>
      <GamePage />
    </SudokuProvider>
  );
}
