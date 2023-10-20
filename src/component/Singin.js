import React, { useContext, useState } from 'react'
import style from './style/singup.module.css'
import { useNavigate } from 'react-router-dom';
import alertcontext from './context/alertcontext';
function Singin() {
  const alert=useContext(alertcontext);
  const{show}=alert;
  const [state,setsate]=useState({name:"",username:"",email:"",password:""});
  const Navigate=useNavigate();
  const onchange=(event)=>{
 setsate({...state,[event.target.name]:[event.target.value]});
  }
  const handelsubmit=async(e)=>{
    e.preventDefault();
    try {
      const url='http://localhost:4000/api/auth/createUser';
      const responce=await fetch(url,{
        method:"POST",
        headers:{
          "Content-Type": "application/json"
        },
        body:JSON.stringify({ 
        name:state.name,
        usename:state.username,
        email:state.email,
        password:state.password})
      })
      const data= await responce.json();
      if(data.message){
        Navigate('/login');
      }
      show(data);
    } catch (error) {
      console.log("there is a error to create user");
    }
  }
  return (
    <div>
      <div className={style.con}>
      <div className={style.singin}>
        <form action="" onSubmit={handelsubmit} >
          <h2>-: Sing up :-</h2>
            <label htmlFor='name'>Name:</label>
            <input type='text' name='name' id='name' onChange={onchange} required/><br />
            <label htmlFor="username">Usename:</label>
            <input type="text" name="username" onChange={onchange} required />
            <label htmlFor='email'>Email:</label>
            <input type="email" name="email" id="email" onChange={onchange} required/>
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" onChange={onchange} required/>
            <input type="submit" value="Singin"/>
        </form>
      </div>
      </div>
   
    </div>
  )
}

export default Singin
