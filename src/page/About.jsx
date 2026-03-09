import React from "react";
import { assets } from "../assets/img/assets";
import "./About.css";
function About() {
  return (
    <div>
      <div className="about">
        <h1>About Telemedicine for Rural Healthcare Access</h1>

        <div className="aboutImg">
          <div className="img">
            <img src={assets.about_image} alt="" />
          </div>
          <div className="aboutInfo">
            <p>
              Telemedicine for Rural Healthcare Access is a platform designed to
              improve healthcare services in rural areas. Many people living in
              villages face difficulties in accessing doctors and medical
              facilities. This system allows patients to connect with doctors
              online, book appointments, and receive medical advice without
              traveling long distances. Our goal is to make healthcare more
              accessible, affordable, and efficient for rural communities
              through digital technology.
            </p>
          </div>
        </div>
        <div className="" id="mission">
          <div className="mission">
            <h3>Our Mission</h3>
            <p>
              Our mission is to provide easy and reliable healthcare access to
              people living in rural areas. We aim to connect patients with
              qualified doctors through an online platform, reducing travel time
              and improving medical support.
            </p>
          </div>
          <div className="vision">
            <h3>Our Vision</h3>
            <p>
              Our vision is to create a digital healthcare system where
              everyone, especially people in rural areas, can easily consult
              doctors and receive medical guidance anytime and anywhere.
            </p>
          </div>
        </div>
      </div>
      <h6 style={{marginTop:"100px", marginLeft:"50px"}}>Developed By</h6>
      <p style={{marginLeft:"50px"}}>This project is developed by Satya Bandagar as a final year project to demonstrate how technology can improve healthcare services in rural areas.</p>
    </div>
  );
}

export default About;
