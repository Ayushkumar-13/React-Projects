import React from 'react'
import { useGame } from '../../store/gameStore'

function Cell({ row, col }) {
  const { qBoard, setSelectedCell, selectedCell, board, isPause, pencilValue, isComplete } = useGame()

  function handleClick() {
    if (isPause || isComplete) return 
    setSelectedCell(row, col)
  }

  function isSelected() {
    const selRow = selectedCell.row
    const selCol = selectedCell.col
    const squares = selectedCell.squares

    const hasSelection = selRow !== null && selCol !== null

    const isInSameSquare =
      hasSelection &&
      squares?.some(([r, c]) => r === row && c === col)

    if (selRow === row && selCol === col) {
      return "bg-neutral-950 outline outline-blue-500" // selected cell
    } else if (selRow === row) {
      return "bg-slate-900" // same row
    } else if (selCol === col) {
      return "bg-slate-900" // same col
    } else if (
      hasSelection &&
      typeof qBoard[row][col].value === 'number' &&
      qBoard[row][col].value !== 0 &&
      qBoard[selRow][selCol] &&
      qBoard[row][col].value === qBoard[selRow][selCol].value
    ) {
      return "bg-slate-900" // same value
    } else if (isInSameSquare) {
      return "bg-slate-900" // same 3x3 box using stored squares
    } else {
      return "bg-slate-800 hover:outline hover:outline-[1px] hover:outline-gray-500"
    }
  }

  const cellValue = qBoard[row][col].value
  const cellPencil = qBoard[row][col].pencilValue
  const cellDefault = qBoard[row][col].default

  return (
    <div
      onClick={handleClick}
      className={`Cell select-none relative flex items-center justify-center cursor-pointer w-full h-full rounded-md transition-colors duration-100 ${isSelected()}`}
    >
      {typeof cellValue === 'number' && cellValue !== 0 && (
        <span
          className={`text-2xl md:text-3xl ${
            cellDefault
              ? "text-gray-400"
              : cellValue === board[row][col]
              ? "text-blue-500"
              : "text-red-500"
          }`}
        >
          {cellValue}
        </span>
      )}
      {typeof cellPencil === 'number' && cellPencil !== 0 && !cellDefault && (
        <span
          className={`text-base md:text-2xl absolute -top-1 right-1 text-green-600`}
        >
          {cellPencil}
        </span>
      )}
    </div>
  )
}

export default Cell
