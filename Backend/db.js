const mysql=require("mysql2");
const connect=()=>{
    try {
        const db = new mysql.createConnection({
            host:"localhost",
            user:"root",
            password: "1234",
            database : 'noteapp'
            });
        return db;
    } catch (error) {
   console.log("not connected to database");
    }

}


module.exports=connect;