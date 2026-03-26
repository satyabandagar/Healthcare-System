import React from 'react'
import "./HeroSection.css"
import TotalUser from '../page/TotalUser';

function HeroSection() {

  const doctor = JSON.parse(localStorage.getItem("doctor"));

  if (!doctor) {
    return null;
  }


  return (
   <>
    <div >
      <div className="heroSection">
        
          <div className="doc">

           <div className="docImg">
             {doctor.image ? (
              <img
                src={`http://localhost:5000/uploads/${doctor.image}`}
                width="80"
                height="80"
                style={{ borderRadius: "50%", marginRight: "20px" }}
              />
            ) : (
              <p>No Image</p>
            )}
           </div>

            <div className='docInfo'>
              <h3 style={{fontSize:"50px"}}>Welcome {doctor.name}</h3>
              <p><b>{doctor.speciality}</b></p>
              <p style={{color:"#0f27e3"}}>{doctor.degree}</p>
            </div>

          </div>
        </div>
     
    </div>
     <TotalUser/>
   </>
  )
}

export default HeroSection