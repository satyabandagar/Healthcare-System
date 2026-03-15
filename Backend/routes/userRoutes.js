const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/register",(req,res)=>{

const {name,email,password,mobile,gender} = req.body;

const sql = "INSERT INTO users(name,email,password,mobile,gender) VALUES(?,?,?,?,?)";

db.query(sql,[name,email,password,mobile,gender],(err,result)=>{

if(err){
 return res.send(err);
}

res.json({message:"User Registered Successfully"});

});

});


router.post("/login",(req,res)=>{

const {email,password} = req.body;

const sql = "SELECT * FROM users WHERE email=? AND password=?";

db.query(sql,[email,password],(err,result)=>{

if(err){
 return res.send(err);
}

if(result.length > 0){
 res.json({login:true,user:result[0]});
}else{
 res.json({login:false});
}

});

});

module.exports = router;