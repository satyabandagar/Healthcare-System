import { useState } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import './App.css'
import Navbar from './componet/Navbar';

function App() {

  return (
   <>
   <BrowserRouter>
   <Navbar/>
   <Routes>

   </Routes>
   </BrowserRouter>
   </>
  )
}

export default App
