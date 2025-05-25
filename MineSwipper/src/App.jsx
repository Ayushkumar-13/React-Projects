import React, { useState, useEffect } from "react";
import Board from "./components/Board";

const App = () => {
  const [key, setKey] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => setTimer((t) => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleReset = () => {
    setKey((k) => k + 1);
    setTimer(0);
    setIsRunning(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold mb-6">💣 Minesweeper</h1>
      <div className="flex gap-4 mb-4">
        <div className="text-lg">⏱ Time: {timer}s</div>
        <button
          onClick={handleReset}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          🔄 Reset
        </button>
      </div>
      <Board
        key={key}
        gameKey={key}
        rows={9}
        cols={9}
        mines={10}
        onStart={() => setIsRunning(true)}
        onEnd={() => setIsRunning(false)}
      />
    </div>
  );
};

export default App;
