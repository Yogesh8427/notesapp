import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from './component/About';
import Home from './component/Home';
import Navbar from './component/Navbar';
import Login from './component/Login';
import Singin from './component/Singin';
import Edit from './component/Edit';
import EditState from './component/context/EditState';
import Alert from './component/Alert';
import AlertState from './component/context/AlertState';
function App() {
  return (
    <>
<AlertState>
    <BrowserRouter>
    <Navbar/>
    <Alert/>
    <EditState>
    <Routes>
    <Route path='/' element={<Home/>}></Route>
    <Route path='/about' element={<About/>}></Route>
    <Route path='/login' element={<Login/>}></Route>
    <Route path='/singup' element={<Singin/>}></Route>
    <Route path='/edit' element={<Edit/>}></Route>
    </Routes>
    </EditState>
    </BrowserRouter>
    </AlertState>
    </>
  );
}

export default App;
