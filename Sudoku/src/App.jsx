import React from 'react'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <div className='h-screen overflow-hidden flex flex-col justify-center items-center gap-10'> 
      <Outlet> </Outlet>
    </div>
  )
}

export default App
