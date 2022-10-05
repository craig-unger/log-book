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

function formatDate(date){
  var dateObject = new Date(date);
  var dd = String(dateObject.getDate()).padStart(2, '0');
  var mm = String(dateObject.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = dateObject.getFullYear();
  return mm + '/' + dd + '/' + yyyy;
}


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
                  <th>Issue Licence</th>
                </tr>
              </thead>
              <tbody>
              {users.map(u =>
                <tr key={u._id}>
                  <td>{u.firstName}</td>
                  <td>{u.lastName}</td>
                  <td>{u.licenseNo}</td>
                  <td>{u.licenseType}</td>
                  <td>{formatDate(u.licenseIssueDate)}</td>
                  <td>{formatDate(u.licenseExpiryDate)}</td>
                  <td><button onClick={()=> navigate(`/issue/${u._id}`)}>Issue Licence</button></td>
                  
                </tr>
                 )}
              </tbody>
            </table>
    </div>
  )
}
