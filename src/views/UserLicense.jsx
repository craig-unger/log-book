import { useContext, useEffect, useState } from 'react'
import {useParams,useOutletContext,Link, Outlet, useNavigate} from 'react-router-dom'
import { TokenContext } from '../App';

export default function UserLicense(){
    const [token,setToken] = useContext(TokenContext);
    const [user,setUser] = useState(); 
    const navigate = useNavigate()
  
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

    
    //JSX
    if(!user){      
        return (<div>...loading</div>);      
    }
    else if(user.licenseNo != "N/A"){
        
        return(
            <div className="Div-border">
                <div>
                <h2>License Details</h2>
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
                <label>License Number: {user?.licenseNo}</label>
                </div>
                <div>
                <label>License Type: {user?.licenseType}</label>
                </div>
                <div>
                <label>Issue Date: {user?.licenseIssueDate}</label>
                </div>
                <div>
                <label>Expiry Date: {user?.licenseExpiryDate}</label>
                </div>
                <button onClick={() => navigate("/user/drivinghours")}>Driving Hours</button>
                <button onClick={() => navigate("/user/profile")}>Back to Profile</button>
               
            </div>
        );
    }
        else{
        
            return(
                <div className="Div-border">
                    <div>
                    <h2>License Details</h2>
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
                    <label>License Number: {user?.licenseNo}</label>
                    </div>
                    <div>
                    <label>License Type: {user?.licenseType}</label>
                    </div>
                    <div>
                    <label>Issue Date: {user?.licenseIssueDate}</label>
                    </div>
                    <div>
                    <label>Expiry Date: {user?.licenseExpiryDate}</label>
                    </div>
                    <button onClick={() => navigate("/user/profile")}>Back to Profile</button>
                   
                </div>
            );

    }

}