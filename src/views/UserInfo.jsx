import { useState,useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { parseJwt } from "../web-services";

export default function UserInfo(){
    const [token, setToken] = useState();
    const [users, setUsers] = useState([]);

    // useParams
    const params = useParams()
    let user = users.find(t=>t._id == params.id);

    // useState
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')

    // Function for logout

   function logout(){
        localStorage.removeItem("token");
    }

    // Function Update Link

    // function updateUser(){
    //     fetch(`http://localhost:8080/account/${user._id}`,{
    //         method:"PUT",
    //         headers:{'Content-Type':'application/json'},
    //         body:JSON.stringify( {address,phone})
    //     })
    //     .then(r=>r.json())
    //     .then(j => {
    //         setUsers(users.map(t=>t._id == params.id ? j : t)); 
    //         // navigate("/tasks")
    //     })
    //     .catch(e => alert(e.message)); 
    // }

    useEffect(()=>{
        let t = localStorage.getItem("token");
        setToken(t);

    },[localStorage.getItem("token")])

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
            <Link to="/user/$username">Personal Information | </Link>
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