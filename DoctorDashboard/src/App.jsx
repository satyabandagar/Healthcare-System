import { useState } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import './App.css'
import Navbar from './componet/Navbar';
import HeroSection from './componet/HeroSection';
import DoctorRegister from './componet/DoctorRegister';
import DoctorLogin from './componet/DoctorLogin';

function App() {

  return (
   <>
   <BrowserRouter>
   <Navbar/>
   <Routes>
    <Route path='/register' element={<DoctorRegister/>}/>
    <Route path='/login' element={<DoctorLogin/>}/>
   <Route path='/' element={<HeroSection/>}/>
   </Routes>
   </BrowserRouter>
   </>
  )
}

export default App
