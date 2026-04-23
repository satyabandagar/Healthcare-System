import React from 'react'
import "./Countact.css"

function Countact() {
  return (
    <div>
      <div className="DocContact" style={{width:"96%",marginLeft:"25px",borderRadius:"10px",height:"550px",backgroundColor:"#bab8b8aa", marginTop:"100px"}}>
        <div className="DoctorHelp" style={{display:"flex", gap:"10px",width:"100%"}}>
          <form action="" style={{display:"flex",flexDirection:"column",gap:"20px" ,width:"50%"}}>
            <label htmlFor="" style={{marginRight:"420px"}}>Full name</label>
            <input type="text" placeholder='Enter your name' />
            <label htmlFor="" style={{marginRight:"450px"}}>Email</label>
            <input type="gmail" placeholder='Enter your gmail' />
            <label htmlFor="">Problem Description</label>
            <input type="text" />
            <br />
            <button type='submit' style={{width:"150px", display:"flex",alignItems:"center",justifyContent:"center",marginLeft:"200px"}}> Submit</button>
          </form>
          <div className="DoctoDes" style={{width:"50%"}}>
          <h1>Version</h1>
          <br />
          <p>If you experience any issues while using this website, you can submit your problem here. Our team will carefully review your concern and take the necessary steps to resolve it as quickly as possible. We are committed to providing a smooth and reliable user experience.</p>
        </div>
        </div>
        
      </div>
    </div>
  )
}

export default Countact
