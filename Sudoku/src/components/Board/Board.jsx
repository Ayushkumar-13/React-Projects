import { useGame } from '../../store/gameStore';
import { MODES } from '../../store/sudokuUtils';
import Square from './Square';
import React from 'react';

function Board() {
  const { changeQBoard, mode, mistake, totalMistakes, time, isPause, isComplete, tryAgain } = useGame();
  const numbers = Array(9).fill(null);
  const squares = Array(3).fill(null).map(() => Array(3).fill(null));  // ✅ FIXED

  function formateTime(seconds) {
    seconds = Math.max(0, Math.floor(seconds));
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const minutesFormatted = String(minutes).padStart(2, "0");
    const secondsFormatted = String(remainingSeconds).padStart(2, "0");
    return `${minutesFormatted} : ${secondsFormatted}`;
  }

  return (
    <div className="flex w-screen h-auto md:w-[600px] md:h-[600px] p-2 flex-col gap-2 relative">
      {isPause && (
        <span className="text-3xl md:text-6xl text-center w-full bg-slate-700 border z-10 shadow-lg border-black p-6 md:p-10 rounded-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          Pause
        </span>
      )}

      {isComplete && (
        <div className="text-xl md:text-2xl w-full bg-slate-700 border z-10 shadow-lg border-black p-6 md:p-10 rounded-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <span>All Mistakes Used</span>
          <div className="flex flex-col md:flex-row items-center p-5 justify-around gap-3">
            <button onClick={() => tryAgain()} className="bg-slate-900 p-3 rounded-md hover:bg-slate-800 active:scale-90">
              Try Again
            </button>
            <button className="bg-slate-900 p-3 rounded-md hover:bg-slate-800 active:scale-90">
              Start New
            </button>
          </div>
        </div>
      )}

      {/* Game Status */}
      <div className="flex flex-wrap justify-around text-sm md:text-xl pt-10 w-full text-center gap-y-2">
        <p>Mode: <span>{mode.name}</span></p>
        <p>Mistakes: <span>{mistake}/{totalMistakes}</span></p>
        <p>Time: <span>{formateTime(time)}</span></p>
      </div>

      {/* Game Grid */}
      {squares.map((arr, row) => (
        <div key={row} className="flex gap-2 w-full h-full">
          {arr.map((_, col) => (
            <Square key={col} row={row} col={col} />
          ))}
        </div>
      ))}

      {/* Number Pad */}
      <div className="flex justify-around select-none w-full">
        {numbers.map((_, i) => (
          <span
            key={i}
            onClick={() => changeQBoard(i + 1)}
            className="text-slate-200 bg-neutral-900 shadow-lg rounded-md p-2 outline-[1px] hover:outline md:px-3 my-5 text-2xl cursor-pointer"
          >
            {i + 1}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Board;
