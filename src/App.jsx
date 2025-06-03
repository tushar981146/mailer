import { useState, useEffect } from 'react'
import List from './components/List'
import Messages from './components/Messages'
import {getAllData, uniqueId} from './services/service'
import { Outlet } from 'react-router-dom'


function App() {
  

  return (
    <div className="text-white bg-black h-screen w-[100%] flex ">
      <List/>
      <Outlet />
      <div className=""></div>
    </div>
  )
}

export default App
