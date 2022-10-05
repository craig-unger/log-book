import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { register } from "../web-services"

export default function Register(){

    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [firstName,setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')

    const navigate = useNavigate(); 

    function submit(){
        register(username,password, firstName, lastName, address, phone)
            .then(r=> {
                // alert("User Registered"); 
                alert(`User ${username} has been successfully Registered`)
                navigate("/login")
            })
            .catch(e => alert(e.message)); 
    }

    return (
        <div className="Div-border">
            <h2>Register Today</h2>
            <div className="form input">
            
                <label>Username (Must be a valid email address)</label>
                <br/>
                <input type="email" value={username} onChange={e=>setUsername(e.target.value)} />
            
           
                <label>Password</label>
                <br/>
                <input type="password" value={password} onChange={e=>setPassword(e.target.value)} />
            
            
                <label>Enter First Name</label>
                <br/>
                <input type="text" value={firstName} onChange={e=>setFirstName(e.target.value)} />
            
            
                <label>Last Name</label>
                <br/>
                <input type="text" value={lastName} onChange={e=>setLastName(e.target.value)} />
            
            
                <label>Address</label>
                <br/>
                <input type="text" value={address} onChange={e=>setAddress(e.target.value)} />
            
            
                <label>Phone</label>
                <br/>
                <input type="number" value={phone} onChange={e=>setPhone(e.target.value)} />
          

            <button onClick={submit}>Register</button>
            </div>
        </div>
    )

}