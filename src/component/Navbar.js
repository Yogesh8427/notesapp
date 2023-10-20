import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import style from './style/navbar.module.css';
import alertcontext from './context/alertcontext';
function Navbar() {
  const alert=useContext(alertcontext);
  const{show}=alert;
  const navigate=useNavigate();
  const logout=()=>{
    localStorage.removeItem('token');
    show({message:"Logout Successfully"})
    navigate('/login');
  }
  return (
    <>
     <div className={style.navbar}>
        <div className={style.col1}>
        <h2 className={style.appname}>NotesApp</h2>
        <Link to="/"><h2>Home</h2></Link>
        <Link to="/about"><h2>About us</h2></Link>
        </div>
        <div className={style.buttons}>
          {(!localStorage.getItem('token'))?<><Link to="/login"><input type="button" value="login" /></Link>
        <Link to="/singup"><input type="button" value="Singup" /></Link></>:<input type="button" value="logout" style={{"width":"30%"}} onClick={logout} />}
        </div>
    </div>
    </>
  )
}

export default Navbar
