import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MODES, sudoku } from './sudokuUtils';

const initialState = {
    isStart: false,
    isPause: false,
    isComplete: false,
    pencilMode: false,
    mistake: 0,
    totalMistakes: 5,
    hints: 0,
    time: 0,
    mode: MODES["easy"],
    board: Array.from({ length: 9 }, () => Array(9).fill(0)),
    qBoard: Array.from({length:9}, () => Array(9).fill(0)),
    selectedCell: {
        row: null,
        col: null,
        squares: null
    }
};

const gameState = (set) => ({
    ...initialState,

    startGame: (mode) => {
        const data = sudoku(mode);
        const solved = data.solvedBoard;
        const unsolved = data.unSolvedBoard;

        const qBoard = unsolved.map((row) =>
            row.map((num) => ({
                default: num !== 0,
                value: num,
                pencilValue: 0
            }))
        );

        set({
            board: solved,
            qBoard,
            isStart: true,
            hints: MODES[mode].hints,
            totalMistakes: MODES[mode].mistakes,
            mode: MODES[mode]
        });
    },

    setSelectedCell: (row, col) => {
        const iRow = Math.floor(row / 3) * 3;
        const iCol = Math.floor(col / 3) * 3;
        const squares = [];
        for (let x = iRow; x < iRow + 3; x++) {
            for (let y = iCol; y < iCol + 3; y++) {
                squares.push([x, y]);
            }
        }
        set({ selectedCell: { row, col, squares } });
    },

    changeQBoard: (num) => {
        set((state) => {
            if (state.isPause || state.isComplete) return state;

            const row = state.selectedCell.row;
            const col = state.selectedCell.col;
            if (row === null || col === null || state.qBoard[row][col].default) return state;

            const qBoard = state.qBoard.map((r) => r.map((c) => ({ ...c })));
            let mistake = state.mistake;
            let isComplete = state.isComplete;

            if (state.pencilMode) {
                qBoard[row][col].pencilValue = num;
            } else {
                qBoard[row][col].value = num;
                if (num !== state.board[row][col]) {
                    mistake++;
                    if (mistake >= state.totalMistakes) isComplete = true;
                } else {
         
                    const hasWon = qBoard.every((r, i) =>
                        r.every((c, j) => c.value === state.board[i][j])
                    );
                    if (hasWon) isComplete = true;
                }
            }

            return { ...state, qBoard, mistake, isComplete };
        });
    },

    increaseTime: () => {
        set((state) => {
            const newTime = state.time + 1;
            localStorage.setItem('game', JSON.stringify({ ...state, time: newTime }));
            return { ...state, time: newTime };
        });
    },

    pauseGame: () => {
        set((state) => ({ ...state, isPause: !state.isPause }));
    },

    quitGame: () => {
        set(initialState);
    },

    togglePencilMode: () => {
        set((state) => ({ ...state, pencilMode: !state.pencilMode }));
    },

    tryAgain: () => {
        set((state) => {
            const qBoard = state.qBoard.map((row) =>
                row.map((item) => {
                    if (item.default) return item;
                    return { default: false, pencilValue: 0, value: 0 };
                })
            );
            return {
                ...state,
                qBoard,
                mistake: 0,
                hints: state.mode.hints,
                isComplete: false,
                isPause: false,
                time: 0
            };
        });
    },

    useHint: () => {
        set((state) => {
            const row = state.selectedCell.row;
            const col = state.selectedCell.col;
            if (
                state.hints <= 0 ||
                row === null ||
                col === null ||
                state.isPause ||
                state.isComplete ||
                state.qBoard[row][col].default
            )
                return state;

            const qBoard = state.qBoard.map((r) => r.map((c) => ({ ...c })));
            qBoard[row][col].value = state.board[row][col];

            return { ...state, qBoard, hints: state.hints - 1 };
        });
    },

    continueGame: () => {
        const game = JSON.parse(localStorage.getItem('game'));
        if (game) {
            set(game);
        }
    },

   
    resetQBoard: () => {},
    setState: () => {},
});

export const useGame = create(persist(gameState, { name: 'board' }));
