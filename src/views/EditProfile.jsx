import {useState, useEffect, useContext} from 'react'; 
import {useParams,useOutletContext, useNavigate} from 'react-router-dom'
import { TokenContext } from '../App';

export default function EditProfile(){
    const [token, setToken] = useContext(TokenContext)
    //navigation
    const navigate = useNavigate(); 
    //useState
    const [user,setUser] = useState(localStorage.getItem("token"));
    //params
    const params = useParams();
    
    const [address, setAddress] = useState(user?.address)
    const [phone, setPhone] = useState(user?.phone)

    useEffect(()=>{
        let config  = {
            method:'GET',
            headers:{ 'Authorization': `Bearer ${token}`}
        }
        fetch(`http://localhost:8080/account/me`,config)
            .then(r=>r.json())
            .then(j => {
                setUser(j); 
            })
            .catch(e=>alert(e.message))

    },[token])

    //functions
    function updateProfile(){
        fetch(`http://localhost:8080/account/me`,{
            method:"PUT",
            headers:{'Authorization': `Bearer ${token}`,'Content-Type':'application/json'},
            body:JSON.stringify( {_id:user._id, address, phone, username:user.username, firstName:user.firstName, lastName:user.lastName, password:user.password})
    
        })
        .then(r=>r.json())
        .then(j => {
            setUser(j)
            navigate("/user/profile")
        })
        .catch(e => alert(e.message)); 
    }
    // function cancel button
    function backButton(){
        navigate("/user/profile");
    }
   

    if(!user){      
        return (<div>...loading</div>);      
    }
    else{
        
        return(

            <div className="Div-border">
                <div>
                <h2>Edit details</h2>
                </div> 
                <label>Customer ID: {user?._id}</label>
                <div>
                <label>Username: {user?.username} </label>
                </div>
                <div>
                <label>First Name: {user?.firstName} </label>
                </div>
                <div>
                <label>Last Name: {user?.lastName} </label>
                </div>
                <div>
                <label>Address: {user?.address} </label>
                </div>
                <input value={address || ''} onChange={e=>setAddress(e.target.value)} />
                <div>
                <label>Phone: {user?.phone} </label>
                </div>
                <input value={phone || ''} onChange={e=>setPhone(e.target.value)} />
                <div>
            <button onClick={updateProfile}>Save</button>
            <button onClick={backButton}>Cancel</button>
            </div>
            </div>
        );

    }
}