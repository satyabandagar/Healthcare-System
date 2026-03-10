import React from 'react'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import { doctors } from '../assets/img/assets';
import "./DoctorList.css"

function DoctorList() {

    const { id } = useParams();
    let doctor = doctors.find((doc) => doc._id === id);
  return (
    <>
    <div id='docInfo'>
      <div className="docInfo">
        <div className="docImg">
            <img src={doctor.image} alt="" />
        </div>
        <div className="docDetel">
            <h1> <samp>Name:</samp> {doctor.name}</h1>
            <p> <samp>Speciality: </samp>{doctor.speciality}</p>
            <p><samp>Degree:</samp> {doctor.degree}</p>
            <p><samp>Experience:</samp> {doctor.experience}</p>
            <p><samp>Fee: ₹</samp>{doctor.fees}</p>
            <p><samp>About:</samp> {doctor.about}</p>
            <ul>
                <li style={{listStyle:"none", fontWeight:"bold"}}>Address</li>
                <li>{doctor.address.line1}</li>
                <li>{doctor.address.line2}</li>
            </ul>
        </div>
        
      </div>
      <div className="docBtn">
        <a href="/" style={{backgroundColor:"#eb4141df", color:"black"}}>Bank</a>
        <a href="" style={{backgroundColor:"#33d754e4", color:"black"}}>Book Now</a>
      </div>
      
    </div>
    
    </>
    
  )
}

export default DoctorList
