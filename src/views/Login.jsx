import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { loginAsync } from "../web-services";

export default function Login(){

    const [username,setUserName] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate(); 
    const [token,setToken] = useOutletContext();
    
    function login(){
     
        loginAsync(username,password)
            .then(j => {
                setToken(j); 
                navigate("/user/$username")
            })
            // .catch(e => alert(e.message))
            .catch(e => alert(e.message = "Invalid username or password"))
    }

    return(
        <div className="Div-border">
            <h2>Sign In</h2>
            <div>
                <label>Username: </label>
                <br/>
                <input type="text" value={username} onChange={e=>setUserName(e.target.value)}/>
            </div>
            <div>
                <label>Password: </label>
                <br/>
                <input type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
            </div>
            <button onClick={login}>Sign in</button>
        </div>
    ); 
}