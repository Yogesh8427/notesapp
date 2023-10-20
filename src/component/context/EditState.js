import React, { useState } from 'react'
import editcontext from './editcontext'
function EditState(props) {
  const[notes,setnotes]=useState({tittle:"",data:"",noteid:""});
 const setdetail=(element)=>{
   setnotes({tittle:element.tittle,data:element.data,noteid:element.noteid});
 };
  return (
    <div>
    <editcontext.Provider value={{notes,setdetail}}>
     {props.children}
    </editcontext.Provider>
    </div>
  )
}

export default EditState
