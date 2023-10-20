import React, { useContext,useEffect,useState} from 'react'
import style from './style/edit.module.css'
import editcontext from './context/editcontext'
import { useNavigate } from 'react-router-dom';
import alertcontext from './context/alertcontext';
function Edit() {
  const alert=useContext(alertcontext)
  const{show}=alert;
    const context=useContext(editcontext);
    const{notes}=context;
    const navigate=useNavigate();
    const[state,setstate]=useState({tittle:notes.tittle,data:notes.data,noteid:notes.noteid})
    const onchange=(event)=>{
        setstate({...state,[event.target.name]:[event.target.value]});
    }
   useEffect(()=>{
    if(notes.tittle===""){
        navigate('/')
    }
   })
    const editnotes=async(e)=>{
        e.preventDefault();
        console.log(notes);
        try {
            const url="http://localhost:4000/api/notes/edit";
          const responce= await fetch(url,{
            method:'PUT',
            headers:{
              "usename": localStorage.getItem('token'),
              "Content-Type": "application/json"
            },
            body:JSON.stringify({tittle:state.tittle,data:state.data,noteid:state.noteid})
          });
          const result=await responce.json();
          if(result.message){
            navigate('/');
          }
       show(result);
        } catch (error) {
          console.log("there is an any server error to edit a notes");
        }
      
       }
  return (
    <>
       <div className={style.adddata}>
        <div className={style.form}>
          <form onSubmit={editnotes}>
            <label htmlFor="tittle">Tittle</label>
            <input type="text" name="tittle" value={state.tittle} onChange={onchange}/>
            <label htmlFor="data">Description</label>
            <textarea name="data" cols="5" rows="5" value={state.data} onChange={onchange}></textarea>
            <input type="submit" value="edit" />
          </form>
        </div>
    </div>
    </>
  )
}

export default Edit
