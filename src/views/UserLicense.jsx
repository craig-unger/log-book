import { useEffect, useState } from 'react'
import {useParams,useOutletContext,Link, Outlet} from 'react-router-dom'
// import { fetchAllUsers } from '../web-services'


export default function UserLicense(){

    const [user,setUser] = useState(); 
    //params
    const params = useParams();
  
    useEffect(()=>{

        let config  = {
            method:'GET',
            headers:{ 'Authorization': `Bearer ${localStorage.getItem('token')}`}
        }

        fetch(`http://localhost:8080/account/me`,config)
            .then(r=>r.json())
            .then(j => {
                setUser(j); 
            })
            .catch(e=>alert(e.message))

    },[params.username])

    // let task = tasks.find(t=>t.assignee == params.assignee); 
    
    //JSX
    if(user == undefined){      
        return (<div>Not Found</div>);      
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
                    {/* <Link to={"/"}>Go Back</Link> */}
                {/* <Link to={"/user/edit/$username"}>Edit Profile</Link> | */}
                <Link to={"/user/:username"}> Back To Profile</Link>
                <br/>
                <Link to={"/user/drivinghours/:id"}>Driving hours</Link>
            </div>
        );

    }

}