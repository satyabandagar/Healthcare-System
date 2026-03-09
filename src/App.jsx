import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Allpage from './page/Allpage';
import './App.css'
import Navbar from './page/Navbar';
import Footer from './page/Footer';
import About from './page/About';
import Contact from './page/Contact';

function App() {
 

  return (
    <>
     <BrowserRouter>
     <Navbar/>
     <Routes>
        <Route path='/' element={<Allpage/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
     </Routes>
     <Footer/>
     </BrowserRouter>
    </>
  )
}

export default App
