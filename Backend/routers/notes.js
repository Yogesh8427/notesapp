const {Router}= require("express");
const connect=require("../db.js")
const router=Router();

const db=connect();

//fetching data for perticular user;
router.get("/",(req,res)=>{
const id=req.header('usename');
const sql=`select * from notes where personId="${id}"`;
db.query(sql,(err,result)=>{
    try {
        if(err) throw err;
        if(result[0]){
           res.json(result);
        }
        else{
           res.json({message:"no data found "});
        }
    } catch (error) {
       res.status(404);
       res.json({error}); 
    }
})
});

//creating notes

router.post("/createnote",(req,res)=>{
    const id=req.header('usename');
    const{tittle,data}=req.body;
    const sql= `insert into notes(personid,tittle,data) values("${id}","${tittle}","${data}")`;
    db.query(sql,(err,result)=>{
        try {
            if(err) throw err;
        res.json({message:"notes insert sucessfully"})  
        } catch (error) {
            res.status(404);
            res.json({message:"invalid user",error}); 
        }
       
    })
})

//edit notes

router.put("/edit",(req,res)=>{
    const id=req.header('usename');
    const{tittle,data,noteid}=req.body;
    const sql=`update notes set tittle="${tittle}",data="${data}" where noteid="${noteid}" and personId="${id}"`;
    db.query(sql,(err,result)=>{
        try {
            if(err) throw err;
                res.json({message:"edit sucessfully"});
        } catch (error) {
               res.status(404);
            res.json({message:"invalid user",error});   
        }
    })
})

//delete note
router.delete("/delete",(req,res)=>{
    const id=req.header('usename');
    const{noteid}=req.body;
    sql=`delete from notes where noteid=${noteid} and personId="${id}"`;
    db.query(sql,(err,result)=>{
        try {
            res.json({message:"delete sucessfully"});
        } catch (error) {
            res.status(404);
            res.json({message:"invalid user",error});   
        }
    })
})
module.exports=router;
