import React, { useState } from 'react'
import alertcontext from './alertcontext';
function AlertState(props) {
    const[alr,setalr]=useState({msg:"",err:""});
    const show=(value)=>{
     setalr({msg:value.message,err:value.error});
     setTimeout(() => {
        setalr({msg:"",err:""});
     }, 1500);
    }
  return (
    <div>
      <alertcontext.Provider value={{alr,show}}>
       {props.children}
      </alertcontext.Provider>
    </div>
  )
}

export default AlertState;

