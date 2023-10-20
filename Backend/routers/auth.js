const { Router }=require("express");
const connect= require("../db.js");
const router= Router();

const db=connect();
//creating a user 
router.post("/createUser",(req,res)=>{
   const{name,usename,email,password}=req.body;
   const sql=`Select * from login where usename="${usename}" And email="${email}"`;
   db.query(sql,(err,result)=>{
    if(err) throw err;
    if (result[0]){
        res.status(404);
        res.json({error:"user already exists"});      
    }else{
const sql2=`INSERT INTO login (name, usename, email, password) VALUES ("${name}","${usename}","${email}","${password}")`;
db.query(sql2,(err,result)=>{
    if(err) throw err;
    return res.json({message:"User created Successfully",id:usename}).status(200);
 });
}
});
});

//login user
router.post("/login",(req,res)=>{
    const {usename,password}=req.body;
    const sql=`select usename,password from login where usename="${usename}" And password="${password}"`;
    db.query(sql,(err,result)=>{
        if(err) throw err;
        if(result[0]){
            res.json({message:"log in sucessfully",id:usename });
        }
        else{
            res.status(404);
            res.json({error:"invalid user"});
        }
    })
});


module.exports=router;

