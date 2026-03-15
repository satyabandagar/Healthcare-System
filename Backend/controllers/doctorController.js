const db = require("../db");

exports.getDoctors = (req,res)=>{

const sql = "SELECT * FROM doctors";

db.query(sql,(err,result)=>{

if(err){
 return res.send(err);
}

res.json(result);

});

};