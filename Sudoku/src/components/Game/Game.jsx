import React, { useEffect, useRef } from 'react'
import { Edit, LogOut, Pause, PencilLine, Lightbulb, Play } from 'lucide-react'
import Board from '../Board/Board'
import { useNavigate } from 'react-router-dom'
import { useGame } from '../../store/gameStore'

function Game() {
  const navigate = useNavigate()
  const timeRef = useRef()
  const { isStart, increaseTime, isPause, pauseGame, time, isComplete, quitGame, pencilMode, togglePencilMode, useHint,hints, resetQBoard} = useGame()
  useEffect(() => {
    if (!isStart) {
      navigate('/')
    }
    timeRef.current = setInterval(() => {
      if (!isPause && !isComplete)
        increaseTime()
    }, 1000)
    return () => clearInterval(timeRef.current)
  }, [isPause, time, isComplete,isStart])
  return (
    <div className='flex flex-col items-center justify-center'>

      <Board />
      <div className='flex items-center w-full justify-around'>
        <button onClick={() => quitGame()} className="option bg-slate-900 p-3 rounded-md hover:bg-slate-800  active:scale-90" >
          <LogOut />
        </button>
        <button onClick={() => pauseGame()} className="option bg-slate-900 p-3 rounded-md hover:bg-slate-800  active:scale-90" >
          {!isPause ? <Pause /> : <Play />}
        </button>
        <button onClick={() => resetQBoard()} className="option bg-slate-900 p-3 rounded-md hover:bg-slate-800  active:scale-90" >
          Reset
        </button>
        <button onClick={() => togglePencilMode()} className={`option bg-slate-900 p-3 rounded-md hover:bg-slate-800  active:scale-90 ${pencilMode && "text-green-500"}` } >
          <PencilLine />
        </button>
        <button onClick={() => useHint()} className="option bg-slate-900 p-3 rounded-md hover:bg-slate-800  active:scale-90 relative" >
          <span className='absolute h-6 w-6 -right-3 -top-3 flex items-center justify-center text-center text-xl bg-blue-700 text-white p-2 rounded-full'> {hints}</span>
          <Lightbulb />
        </button>
      </div>
    </div>
  )
}

export default Game