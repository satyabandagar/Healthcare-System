import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Regsiter.css"
function LogIn() {

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const handleLogin=(e)=>{
e.preventDefault();

fetch("http://localhost:5000/api/user/login",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({email,password})
})
.then(res=>res.json())
.then(data=>{

if(data.login){

localStorage.setItem("user",JSON.stringify(data.user));

navigate("/");

}else{
alert("Invalid Login");
}

});

};

  return (
    <div className='parentReg'>
       <div className="RegUser">
        <h1>Log-In Patient</h1>
        <form action="" onSubmit={handleLogin}>
            <div className="" id='formReg'>
           
            <label htmlFor="Email">Email:</label>
           <input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
            <br />
            <label htmlFor="password">Password:</label>
            <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
            
            <br />
            <br />
            <center><button type='submit' style={{height:"40px",marginRight:"100px"}}>Login</button></center>
            </div>
            <br />
            <p style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}>Or</p>
            <a href="/regsiter" style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}>SingIn</a>
        </form>
      </div>
    </div>
  )
}

export default LogIn
