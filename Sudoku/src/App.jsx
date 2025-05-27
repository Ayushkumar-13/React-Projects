import React from 'react'
import { Outlet } from 'react-router-dom'

function App() {
  return (
  <div className='h-screen overflow-hidden flex flex-col justify-center gap-10 items-center'>
      <Outlet></Outlet>
    </div>
  )
}

export default App
