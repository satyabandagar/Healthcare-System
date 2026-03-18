const express = require("express");
const router = express.Router();
const db = require("../db");


// routes/appointment.js
router.get("/my/:email",(req,res)=>{

const email = req.params.email;

const sql = "SELECT * FROM appointments WHERE patient_email=?";

db.query(sql,[email],(err,result)=>{

if(err){
return res.send(err)
}

res.json(result)

})

})

// book doctor
router.post("/book",(req,res)=>{

const {doctor_id,doctor_name,patient_name,patient_email} = req.body;

const sql = `
INSERT INTO appointments
(doctor_id,doctor_name,patient_name,patient_email,status)
VALUES (?,?,?,?,?)
`;

db.query(sql,
[doctor_id,doctor_name,patient_name,patient_email,"booked"],
(err,result)=>{

if(err){
 return res.send(err);
}

res.json({message:"Appointment Booked Successfully"});

});

});

router.delete("/cancel/:id",(req,res)=>{

const id = req.params.id;

const sql = "DELETE FROM appointments WHERE id=?";

db.query(sql,[id],(err,result)=>{

if(err){
return res.send(err)
}

res.json({message:"Appointment Cancelled"})

})

})

module.exports = router;