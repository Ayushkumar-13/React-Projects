import React from 'react'
import { useEffect, useRef } from 'react'
import { useGame } from '../../store/gameStore'
import { useNavigate } from 'react-router-dom'


function Home() {
  const { startGame, continueGame } = useGame()
  const navigate = useNavigate()
  const modeRef = useRef()
  function handleStart() {
    startGame(modeRef.current.value)
    localStorage.setItem("mode", modeRef.current.value)
    navigate('/game')
  }

  function handleContinue() {
    continueGame()
    navigate('/game')
  }
  return (
    <>
      <span id='heading' className='text-3xl font-bold'>Sudoku Game</span>
      <div className='flex flex-col items-center justify-center gap-5'></div>
      <button onClick={handleStart} className='bg-slate-900 p-3 rounded-md hover:bg-slate-800 active:scale-90'>Start New</button>
      <button onClick={handleContinue} className='bg-slate-900 p-3 rounded-md hover:bg-slate-800 active:scale-90'>Continue</button>

      <div className='flex items-center gap-5'>
        <label htmlFor="modes">Difficulty:</label>
        <select id="mode" ref={modeRef} className='bg-slate-900 p-5 rounded-lg' defaultValue={'easy'}>
          <option value="veryEasy">Very Easy</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
          <option value="extreme">Extreme</option>
        </select>
      </div>

    </>
  )
}

export default Home
