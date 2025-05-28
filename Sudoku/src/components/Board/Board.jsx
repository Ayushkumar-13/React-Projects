import React from 'react'
import Square from './Square'
import { useGame } from '../../store/gameStore'
function Board() {
    const squares = Array(3).fill(Array(3).fill(null))
    const numbers = Array(9).fill(null)
    const { changeQBoard, mode, mistake, totalMistakes, time, isPause, isComplete, tryAgain, startGame} = useGame()
    function formatTime(seconds) {
        seconds = Math.max(0, Math.floor(seconds))
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = seconds % 60
        const minutesFoormatted = String(minutes).padStart(2, "0")
        const secondsFormatted = String(remainingSeconds).padStart(2, "0")
        return `${minutesFoormatted} : ${secondsFormatted}`

    }
    return (
        <div className='flex w-screen h-[50vh] md:w-[600px] md:h-[600px] p-2 flex-col gap-2 relative '>
            {
                isPause && <span className='text-6xl text-center w-full bg-slate-700 border z-10 shadow-lg border-black p-10 rounded-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>Pause</span>
            }
            {
                isComplete && <div className='text-2xl w-full bg-slate-700 border z-10 shadow-lg border-black p-10 rounded-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                    {mistake >= totalMistakes ?  <div className='text-center'> <p><b>Game Over ☠️ </b> All Mistakes Used </p></div> : <span>Very Good!! </span> }
                    <div className='flex items-center p-5 justify-around'>
                        <button onClick={() => tryAgain()} className="option bg-slate-900 p-3 rounded-md hover:bg-slate-800  active:scale-90" >
                            Try Again
                        </button>
                        <button onClick={() => startGame(mode.key)} className="option bg-slate-900 p-3 rounded-md hover:bg-slate-800  active:scale-90" >
                            Start New
                        </button>
                    </div>
                </div>
            }
            <div className='flex justify-around text-xl pt-5 w-full'>
                <p>Mode: <span>{mode.name}</span></p>
                <p>Mistakes:{" "} <span>{mistake}/{totalMistakes}</span></p>
                <p>Time: <span>{formatTime(time)}</span></p>
            </div>
            {squares.map((arr, row) => (
                <div key={row} className='flex gap-2 w-full h-full'>
                    {arr.map((_, col) => (

                        <Square key={col} row={row} col={col} />
                    ))}

                </div>

            ))}
            {/*  to show numbers div 1-9 boxes  */}
            <div className='flex justify-around select-none w-full'>
                {
                    numbers.map((_, i) => (
                        <span key={i} onClick={() => changeQBoard(i + 1)} className="text-slate-200 bg-neutral-900 shadow-lg rounded-md p-2 md:px-3 my-5 text-2xl cursor-pointer outline-none hover:outline hover:outline-1 ">
                            {i + 1}
                        </span>


                    ))
                }
            </div>
        </div>

    )
}

export default Board
