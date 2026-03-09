import React from 'react'
import "./Navabar.css"
import { assets } from '../assets/img/assets'
function Navbar() {
  return (
    <div className='nav'>
       <div className="logo">
        <a href="/"><img src={assets.logo} alt="logo" /></a>
       </div>
       <div className="content">
        <ul>
            <a href="about"><li>About</li></a>
            <a href="contact"><li>Contect</li></a>
           <a href="" id='Regster'> <li>Regsiter</li></a>
        </ul>
       </div>
    </div>
  )
}

export default Navbar
