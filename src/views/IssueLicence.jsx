import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { TokenContext } from '../App';

export default function IssueLicence() {
    const [token, setToken] = useContext(TokenContext)
    //navigation
    const navigate = useNavigate(); 
    //useState
    const [user,setUser] = useState();
    //params
    const { id } = useParams();
    
    const [licenseType, setLicenseType] = useState("")
    const [licenseIssueDate, setLicenseIssueDate] = useState(user?.licenseIssueDate);
    const [licenseExpiryDate, setLicenseExpiryDate] = useState(user?.licenseExpiryDate)

    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        
        var raw = "";
        
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
        
        fetch(`http://localhost:8080/admin/${id}`, requestOptions)
          .then(response => response.json())
          .then(result => setUser(result))
          .catch(error => console.log('error', error));

    },[])

    //functions
    function updateProfile(){
        fetch(`http://localhost:8080/account/${id}`,{
            method:"PUT",
            headers:{'Authorization': `Bearer ${token}`,'Content-Type':'application/json'},
            body:JSON.stringify( {
                _id: user._id, 
                address: user.address, 
                phone: user.phone, 
                username: user.username, 
                firstName: user.firstName, 
                lastName: user.lastName, 
                password: user.password,
                licenseType,
                licenseIssueDate,
                licenseExpiryDate,
                licenseNo: user._id
            })
    
        })
        .then(r=>r.json())
        .then(j => {
            setUser(j)
            alert(`Licence no ${user._id} issued`)
            navigate("/admin")
        })
        .catch(e => alert(e.message)); 
    }
    // function cancel button
    function backButton(){
        navigate("/admin");
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
                <div>
                <label>Phone: {user?.phone} </label>
                </div>
                <div>
                <label>Licence No: {user._id} </label>
                </div>
                <div>
                <label>Licence Type: </label>
                </div>
                <div>
                <select value={licenseType || ''} onChange={e=>setLicenseType(e.target.value)}>
                <option value="">- Please select category -</option>
                <option value="Learner">Learner</option>
                <option value="Provisional 1">Provisional 1</option>
                <option value="Provisional 2">Provisional 2</option>
                </select>
                </div>
                <div>
                <label>Licence Issue Date: </label>
                </div>
                <div>
                <input type="date" value={licenseIssueDate || ''} onChange={e=>setLicenseIssueDate(e.target.value)} />
                </div>
                <div>
                <label>Licence Expiry Date: </label>
                </div>
                <div>
                <input type="date" value={licenseExpiryDate || ''} onChange={e=>setLicenseExpiryDate(e.target.value)} />
                </div>
               
                
            <div>
            <button onClick={updateProfile}>Save</button>
            <button onClick={backButton}>Cancel</button>
            </div>
            </div>
            
        );

    }
}
