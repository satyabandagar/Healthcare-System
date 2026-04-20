import React from 'react'
import "./Countact.css"

function Countact() {
  return (
    <div>
      <div className="DocContact">
        <div className="DoctorHelp">
          <form action="">
            <label htmlFor="" style={{marginRight:"420px"}}>Full name</label>
            <input type="text" placeholder='Enter your name' />
            <label htmlFor="" style={{marginRight:"450px"}}>Email</label>
            <input type="gmail" placeholder='Enter your gmail' />
            <label htmlFor="">Problem Description</label>
            <input type="text" />
            <br />
            <button type='submit'> Submit</button>
          </form>
        </div>
        <div className="DoctoDes">
          <h1>Version</h1>
          <p>If you experience any issues while using this website, you can submit your problem here. Our team will carefully review your concern and take the necessary steps to resolve it as quickly as possible. We are committed to providing a smooth and reliable user experience.</p>
        </div>
      </div>
    </div>
  )
}

export default Countact
