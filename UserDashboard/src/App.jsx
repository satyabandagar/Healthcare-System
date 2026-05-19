import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./i18n";
import Allpage from './page/Allpage';
import './App.css'
import Navbar from './page/Navbar';
import Footer from './page/Footer';
import About from './page/About';
import Contact from './page/Contact';
import DoctorList from './componet/DoctorList';
import Regsiter from './page/Regsiter';
import LogIn from './page/LogIn';
import Profile from './page/Profile';
import Appointment from "./componet/Appointment";
import VideoCall from './componet/VideoCall';
import ChatBot from './page/ChatBot';

function App() {


  return (
    <>
     <BrowserRouter>
     <Navbar/>
     <ChatBot/>
     <Routes>
      
        <Route path='/' element={<Allpage/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/regsiter' element={<Regsiter/>}/>
        <Route path='/login' element={<LogIn/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path="/doctor/:id" element={<DoctorList/>}/>
        <Route path="/appointment" element={<Appointment/>}/>
        <Route path="/video/:roomId" element={<VideoCall />} />
        
     </Routes>
     <Footer/>
     </BrowserRouter>
    </>
  )
}

export default App
