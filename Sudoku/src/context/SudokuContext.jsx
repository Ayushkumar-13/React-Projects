import React, { createContext, useContext, useState } from 'react';

// Create context
const SudokuContext = createContext();

// Helper function to create an empty 9x9 Sudoku board
const createEmptyBoard = () => Array(9).fill(null).map(() => Array(9).fill(''));

// Sudoku solving utility functions
function isValid(board, row, col, num) {
  // Check row and column
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num) return false;
    if (board[i][col] === num) return false;
  }

  // Check 3x3 grid
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let r = startRow; r < startRow + 3; r++) {
    for (let c = startCol; c < startCol + 3; c++) {
      if (board[r][c] === num) return false;
    }
  }
  return true;
}

function solve(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === '') {
        for (let num = 1; num <= 9; num++) {
          const strNum = num.toString();
          if (isValid(board, row, col, strNum)) {
            board[row][col] = strNum;
            if (solve(board)) return true;
            board[row][col] = '';
          }
        }
        return false;
      }
    }
  }
  return true;
}

// Provider component
export function SudokuProvider({ children }) {
  const [board, setBoard] = useState(createEmptyBoard());

  // Update a specific cell value (only numbers 1-9 allowed)
  const setCell = (row, col, val) => {
    if (!val || /^[1-9]$/.test(val)) {
      setBoard((prev) => {
        const newBoard = prev.map((r) => [...r]);
        newBoard[row][col] = val;
        return newBoard;
      });
    }
  };

  // Reset board to empty
  const resetBoard = () => {
    setBoard(createEmptyBoard());
  };

  // Solve the current board
  const solveSudoku = () => {
    const boardCopy = board.map((row) => [...row]);
    if (solve(boardCopy)) {
      setBoard(boardCopy);
    } else {
      alert('No solution found!');
    }
  };

  return (
    <SudokuContext.Provider
      value={{
        board,
        setCell,
        resetBoard,
        solveSudoku,
      }}
    >
      {children}
    </SudokuContext.Provider>
  );
}

// Custom hook to use context easily
export function useSudoku() {
  return useContext(SudokuContext);
}
