import React, { useContext} from 'react'
import alertcontext from './context/alertcontext'
function Alert() {
    const message =useContext(alertcontext);
    const{alr}=message;
    return (
        <div>
            <div className="con" style={{ "display": "flex", "justifyContent": "center","height":"100px" }}>
                
                {alr.msg && <h2 style={{ "margin": "2%", "color": "green", "backgroundColor": "gray", "width": "50%", "justifySelf": "center", "borderRadius": "10px", "padding": "3px" }}>
                {alr.msg}</h2> }
            
                 {alr.err &&<h2 style={{ "margin": "2%", "color": "red", "backgroundColor": "gray", "width": "50%", "justifySelf": "center", "borderRadius": "10px", "padding": "3px" }}>
                {alr.err}</h2>}
        </div>
        </div>
    )
}

export default Alert
