import { useState,useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { TokenContext } from "../App";
import { parseJwt } from "../web-services";

export default function UserInfo(){
    const [token, setToken] = useContext(TokenContext);
    const [users, setUsers] = useState([]);

    // useState
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')

    // Function for logout

   function logout(){
        setToken(undefined);
    }
   
    if(!token){
        return (
            <div>
                <Link to="/login">Customer Login</Link> |  
                <Link to="/register"> Register</Link>
            </div>
        ); 
    }
    let payload = parseJwt(token); 
    return (
        <div>
            <div className="User-info">
            <h2>Logged in as {payload.firstName}</h2>
            </div>
            <Link to="/user/profile">Personal Information | </Link>
            <Link to={"/"} onClick={logout}>Logout</Link>
        </div>
    );
}

/*
export default function UserInfo(props){
    if(!props.token){
        return (
            <div>
                <Link to="/login">Login</Link> |  
                <Link to="register"> Register</Link>
            </div>
        ); 
    }
    let payload = parseJwt(props.token); 
    return (
        <div>
            <p>Logged in as {payload.username}</p>
        </div>
    );
}
*/