import React from 'react'
import { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { TokenContext } from '../App';
import GenericTable from '../components/GenericTable';
import { parseJwt } from '../web-services';

export default function DrivingHours() {
    const [token,setToken] = useContext(TokenContext)
    const navigate = useNavigate();
    const [user,setUser] = useState(); 
    
  
    useEffect(()=>{

        let config  = {
            method:'GET',
            headers:{ 'Authorization': `Bearer ${token}`}
        }

        fetch(`http://localhost:8080/account/me`,config)
            .then(r=>r.json())
            .then(j => setUser(j))
            .catch(e=>alert(e.message))

    },[token])
  
    if(!user){
      return(
        <div>

        </div>
      )
    }
    return (
    <div>
      <h2>Driving Hours</h2>
      <h3>{user.firstName} {user.lastName}</h3>
      <button onClick={() => navigate("/user/drivinghours/newentry")}>Add Entry</button>
      <button onClick={() => navigate("/user/license")}>Back to Licence details</button>
      <div>
         
          <div>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Travel Time</th>
                  <th>Instructor</th>
                </tr>
              </thead>
              <tbody>
              {user.logbookHours.map(le =>
                <tr>
                  <td>{le.date}</td>
                  <td>{le.startTime}</td>
                  <td>{le.endTime}</td>
                  <td>{le.travelTime}</td>
                  <td>{le.instructor}</td>
                </tr>
                 )}
              </tbody>
            </table>
          </div>
       
      </div>
    </div>
  )
}
