import React, { useContext, useState } from 'react'
import style from './style/login.module.css'
import { useNavigate } from 'react-router-dom';
import alertcontext from './context/alertcontext';
function Login() {
  const context=useContext(alertcontext);
  const{show}=context;
  const[state,setsate]=useState({username:"",password:""});
  const navigate=useNavigate();
  const onchange=(event)=>{
  setsate({...state,[event.target.name]:[event.target.value]});
  }
  const handelsubmit=async(e)=>{
    e.preventDefault();
    try {
      const url='http://localhost:4000/api/auth/login';
      const responce=await fetch(url,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({usename:state.username,password:state.password})
      })
      const data=await responce.json();
      console.log(data);
      if(data.message){
        localStorage.setItem('token',data.id);
        navigate('/');
      }
      show(data);
    } catch (error) {
      console.log("faild to login");
    }
  }
  return (
    <div>
        <div className={style.con}>
        <div className={style.login}>
        <form onSubmit={handelsubmit}>
        <h2>-: log in :-</h2>
            <label htmlFor="username">Usename:</label>
            <input type="text" name="username" onChange={onchange} />
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" onChange={onchange}/>
            <input type="submit" value="login" />
        </form>
      </div>
        </div>
    </div>
  )
}

export default Login
