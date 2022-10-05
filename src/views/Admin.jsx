import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { TokenContext } from '../App';

export default function Admin() {
    const [token,setToken] = useContext(TokenContext)
    const navigate = useNavigate();
    const [users,setUsers] = useState();

    useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    fetch("http://localhost:8080/admin", requestOptions)
      .then(response => response.json())
      .then(result => setUsers(result))
      .catch(error => console.log('error', error));
},[token])

if(!users){
    return(
    <div>
    ...loading
    </div>
    )
  }  
  return (
    <div>
      <h1>Customer List</h1>
      <table>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Licence Number</th>
                  <th>Licence Type</th>
                  <th>Issue Date</th>
                  <th>Expiry Date</th> 
                </tr>
              </thead>
              <tbody>
              {users.map(u =>
                <tr key={u._id}>
                  <td>{u.firstName}</td>
                  <td>{u.lastName}</td>
                  <td>{u.licenseNo}</td>
                  <td>{u.licenseType}</td>
                  <td>{u.licenseIssueDate}</td>
                  <td>{u.licenseExpiryDate}</td>
                  <td><button onClick={()=> navigate(`/issue/${u._id}`)}>Issue Licence</button></td>
                  
                </tr>
                 )}
              </tbody>
            </table>
    </div>
  )
}
