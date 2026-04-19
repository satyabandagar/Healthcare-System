import React from 'react'
import "./About.css"

function About() {
  return (
    <div className='outerAbout'>
     <div className="about">
        <div className="mission" style={{width:"100%",marginLeft:"20px", backgroundColor:"#7a7676dc", marginTop:"100px",padding:"20px", borderRadius:"15px" }}>
            <h1>Mission</h1>
            <p>To provide easy, affordable, and fast healthcare access to people in rural areas through telemedicine technology.</p>
        </div>
        <div className="" style={{width:"100%",marginRight:"20px", backgroundColor:"#7a7676dc", marginTop:"100px",padding:"20px", borderRadius:"15px" }}>
            <h1>Vision</h1>
            <p>To create a future where quality healthcare is available to everyone, anytime and anywhere through digital solutions.</p>
        </div>
     </div>
    </div>
  )
}

export default About
