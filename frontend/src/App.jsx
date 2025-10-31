import { useState } from 'react'
import Navbar from './assets/components/Navbar'
import React from 'react'
import { Routes , Route , Router} from 'react-router-dom'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Homepage from './Pages/Homepage'
import Income from './Pages/Income'
import Expence from './Pages/Expence'

function App() {

  return (
    <div >
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/Income" element={<Income/>}/>
        <Route path="/Expence" element={<Expence/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Signup" element={<Signup/>}/>
      </Routes>
    </div>
  )
}

export default App
