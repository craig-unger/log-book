import { useContext, useEffect, useState } from 'react'
import {useParams,useOutletContext,Link, useNavigate} from 'react-router-dom'
import { TokenContext } from '../App';
// import { fetchAllUsers } from '../web-services'


export default function UserProfile(){
    const [token, setToken] = useContext(TokenContext)
    const [user,setUser] = useState(); 
    const navigate = useNavigate();
    
  
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

    // let task = tasks.find(t=>t.assignee == params.assignee); 
    
    //JSX
    if(!user){      
        return (<div>Not Found</div>);      
    }
    else{
        
        return(
            <div className="Div-border">
                <div>
                <h2>Customer Profile</h2>
                </div>                
                <div>
                <label>Customer ID: {user?._id}</label>
                </div>
                <div>
                <label>First Name: {user?.firstName}</label>
                </div>
                <div>
                <label>Last Name: {user?.lastName}</label>
                </div>                  
                <div>
                <label>Address: {user?.address}</label>
                </div>
                <div>
                <label>Phone: {user?.phone}</label>
                </div>               
                <button onClick={() => navigate("/user/edit")}>Edit Profile</button>
                <button onClick={() => navigate("/user/license")}>View Licence</button>
            </div>
        );

    }

}