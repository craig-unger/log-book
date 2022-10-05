import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { TokenContext } from '../App';


export default function AddDrivingHours() {
  const [token,setToken] = useContext(TokenContext)
  const navigate = useNavigate();
  const [user,setUser] = useState();
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [travelTime, setTravelTime] = useState();
  const [instructor, setInstructor] = useState(false) 
  

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
       
  
    async function addTrip(){
      const entry = 
      {
            date,
            startTime,
            endTime,
            travelTime,
            instructor,
        }
      const headers = new Headers()
      headers.append('Authorization',`Bearer ${token}`);
      headers.append("Content-Type", "application/json")
      const requestOptions = {
          method: "POST",
          headers,
          body: JSON.stringify(entry),
          
      };
      await fetch(`http://localhost:8080/account/logbook-entry`, requestOptions);
      
       navigate(-1);
    }

  if(!user){
    return(
    <div>
    ...loading
    </div>
    )
  }  
  return (
    <div className="Div-border">
      <h2>New Learning Hours</h2>
      <h3>{user._id}</h3>
      <div>
                <label>Date</label>
                <br/>
                <input type="date" value={date} onChange={e=>setDate(e.target.value)} />
            </div>
            <div>
                <label>Start Time</label>
                <br/>
                <input type="time" value={startTime} onChange={e=>setStartTime(e.target.value)} />
            </div>
            <div>
                <label>End Time</label>
                <br/>
                <input type="time" value={endTime} onChange={e=>setEndTime(e.target.value)} />
            </div>
            <div>
                <label>Travel Time</label>
                <br/>
                <input type="number" value={travelTime} onChange={e=>setTravelTime(e.target.value)} />
            </div>
            <label>Driving Instructor</label><input type="checkbox" checked={instructor} onChange={() => setInstructor(!instructor)} />
            <button onClick={addTrip}>Add</button>
    </div>
  )
}
