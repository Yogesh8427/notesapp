const express=require("express");
const connect= require("./db.js");
var cors = require('cors')
const app=express();

app.use(cors())
const port="4000";
app.use(express.json());
//creating connnection with database; 
const db=connect();
db.connect((err)=>{
    if (err) throw err;
    console.log("Database is Connected Succesfully");
});
//routers
app.use("/api/auth",require("./routers/auth.js"));
app.use("/api/notes",require("./routers/notes.js"));
app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
});