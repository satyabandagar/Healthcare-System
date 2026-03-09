import React from "react";
import { assets } from "../assets/img/assets";
import "./Home.css"
function Home() {
  return (
    <div className="home">
      <div className="hender">
        <h1 style={{color:"#222"}}>Telemedicine for Rural Area <br /><span>Healthcare Access</span> </h1>
        <button><a href="">Register</a></button>
       
      </div>
       <div className="img">
          <img src={assets.header_img} alt="" />
        </div>
    </div>
  );
}

export default Home;
