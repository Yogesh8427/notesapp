import React from 'react'
import style from './style/noteitem.module.css'
function Notesitem(props) {
  return (
    <div>
      <div className={style.card}>
        <h2>{props.tittle}</h2>
        <p>{props.data}</p>
        <i className="fa-solid fa-trash" style={{color:"#fcfcfc"}} onClick={()=>{props.del(props.id)}}></i>
        <i className="fa-solid fa-pen-to-square" style={{color: "#ecedef",float:"right",margin:"3% 0"}} onClick={()=>{props.edi(props.ele)}}></i>
      </div>
    </div>
  )
}

export default Notesitem
