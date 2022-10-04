import React from 'react'
import { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import GenericTable from '../components/GenericTable';

export default function DrivingHours() {
  
    const navigate = useNavigate();
    const [learner, setLearner] = useState({});
    const [drivingHours, setDrivingHours] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [learnerFields, setlearnerFields] = useState([
        {
          fieldName: "Date",
          fieldIdentifier: (learner) => learner.date,
        },
        {
          fieldName: "Start Time",
          fieldIdentifier: (dh) => dh.startTime,
        },
        {
          fieldName: "End Time",
          fieldIdentifier: (dh) => dh.endTime,
        },
        {
            fieldName: "Total Trip Time",
            fieldIdentifier: (dh) => dh.travelTime.toFixed(2)
          },
      
       
     ]); 
  
    const { id } = useParams();
  
    useEffect(() => {
      refreshlearner();
    }, []);
  
    async function refreshlearner() {
      var myHeaders = new Headers();
      myHeaders.append('Authorization',`Bearer ${localStorage.getItem('token')}`, "Content-Type", "application/json");
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      const response = await fetch(`http://localhost:8080/account/me`, requestOptions)
      const learner = await response.json();
       setLearner(learner);
       setDrivingHours(learner.logbookHours);
      
      }
    
  
    return (
    <div>
      <h2>Driving Hours</h2>
      <h3>{learner.firstName} {learner.lastName}</h3>
      <button onClick={() => navigate("/user/drivinghours/newentry")}>Add Entry</button>
      <GenericTable data={drivingHours} displayFields={learnerFields}/>
    </div>
  )
}
