import React from 'react'
import "./Navabar.css"
import { assets } from '../assets/img/assets'
function Navbar() {
  return (
    <div className='nav'>
       <div className="logo">
        <img src={assets.logo} alt="logo" />
       </div>
       <div className="content">
        <ul>
            <a href=""><li>About</li></a>
            <a href=""><li>Contect</li></a>
           <a href="" id='Regster'> <li>Regsiter</li></a>
        </ul>
       </div>
    </div>
  )
}

export default Navbar
