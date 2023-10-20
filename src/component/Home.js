import React, { useContext, useEffect, useRef, useState } from 'react'
import style from './style/home.module.css'
import Notesitem from './Notesitem';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import editcontext from './context/editcontext';
import alertcontext from './context/alertcontext';
function Home() {
  const con=useContext(alertcontext);
  const{show}=con;
  const [data, setdata] = useState([]);
  const [add,setadd]=useState({tittle:"",data:""});
  const navigate = useNavigate();
  const fetchdata = async () => {
    const url = "http://localhost:4000/api/notes/";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        'usename': localStorage.getItem('token')
      }
    });
    const result = await response.json();
    setdata(result);
  }
  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetchdata();
    }
    else {
      navigate('/login');
    }
    // eslint-disable-next-line
  }, []);

  const onchange=(event)=>{
   setadd({...add,[event.target.name]:[event.target.value]});
  }

//add notes to database
  const Addnotes=async(e)=>{
    e.preventDefault();
    try {
      const url="http://localhost:4000/api/notes/createnote";
    const responce= await fetch(url,{
     method:"POST",
     headers:{
      'usename': localStorage.getItem('token'),
      'Content-Type':'application/json'
     },
     body:JSON.stringify({tittle:add.tittle,data:add.data})
    });
    const result= await responce.json();
    if(result.message){
      fetchdata();
      setadd({tittle:"",data:""});
    }
    show(result);
    } catch (error) {
      console.log("faild to add notes");
    } 
  }
//delete notes function
const del=async(id)=>{
const url="http://localhost:4000/api/notes/delete";
try {
  const responce=await fetch(url,{
    method:"DELETE",
    headers:{
      "usename":localStorage.getItem('token'),
      "Content-Type":"application/json"
    },
    body:JSON.stringify({noteid:id})
  })
  const result=await responce.json();
  if(result.message){
    fetchdata();
  }
  show(result);
} catch (error) {
  console.log("cannot delete your notes")
}
}
const context=useContext(editcontext);
const{setdetail}=context;
const ref=useRef(null);
const edi=(element)=>{
  setdetail(element);
ref.current.click();
}
  return (
    <div>
      <div className={style.adddata}>
        <div className={style.form}>
          <form action="" onSubmit={Addnotes}>
            <label htmlFor="tittle">Tittle</label>
            <input type="text" name="tittle" value={add.tittle} onChange={onchange}/>
            <label htmlFor="data">Description</label>
            <textarea name="data" cols="5" rows="5" value={add.data} onChange={onchange}></textarea>
            <input type="submit" value="Add" />
          </form>
        </div>
        <div className={style.show}>
          <h1>-: Your Notes :-</h1>
          <div className={style.card}>
            {data.length>0?
              data.map(element => {
                return <Notesitem tittle={element.tittle} data={element.data} id={element.noteid} key={element.noteid} del={del}  edi={edi} ele={element}></Notesitem>
              }):<h1>"No Notes to display"</h1>
            }
          </div>
        </div>
      </div>
      <Link to='/edit' style={{"visibility":"hidden"}}><button ref={ref}></button></Link>
    </div>
  )
}

export default Home
