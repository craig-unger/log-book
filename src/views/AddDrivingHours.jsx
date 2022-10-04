import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';


export default function AddDrivingHours() {
    const [learner, setLearner] = useState({});
    const [username, setUsername] = useState(learner.username);
    const [password, setPassword] = useState(learner.password);
    const [firstName, setFirstName] = useState(learner.firstName);
    const [lastName, setLastName] = useState(learner.lastName);
    const [address, setAddress] = useState(learner.address);
    const [phone, setPhone] = useState(learner.phone);
    const [licenseNo, setLicenseNo] = useState(learner.licenseNo);
    const [licenseType, setLicenseType] = useState(learner.licenseType);
    const [licenseIssueDate, setLicenseIssueDate] = useState(learner.licenseIssueDate);
    const [licenseExpiryDate, setLicenseExpiryDate] = useState(learner.licenseExpiryDate);
    const [roles, setRoles] = useState(learner.roles)
    const [logbookHours, setLogbookHours] = useState(learner.logbookHours);
    const [date,setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [travelTime, setTravelTime] = useState(0.0);
    const [id, setId] = useState("");
    const navigate = useNavigate();
    
  
    // const { id } = useParams();
  
    async function getLearner(){
      var myHeaders = new Headers();
      myHeaders.append('Authorization',`Bearer ${localStorage.getItem('token')}`, "Content-Type", "application/json");
      
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      const response = await fetch(`http://localhost:8080/account/me`, requestOptions);
      // if(response.status !== 200){
      //   navigate(`/learners/${id}`)
      // }
      const learner = await response.json();
      setLearner(learner);
      setUsername(learner.username);
      setPassword(learner.password);
      setFirstName(learner.firstName);
      setLastName(learner.lastName);
      setAddress(learner.address);
      setPhone(learner.phone);
      setLicenseNo(learner.licenseNo);
      setLicenseType(learner.licenseType);
      setLicenseIssueDate(learner.licenseIssueDate);
      setLicenseExpiryDate(learner.licenseExpiryDate);
      setRoles(learner.roles)
      setLogbookHours(learner.logbookHours);
      
      setId(learner._id)

      }
  
    useEffect(() => {
      getLearner();
    }, []);
  
    async function addTrip(){
      // const drivingHours = learner.drivingHoursIds.push()
      const learner = 
      {
        _id: id,
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
        address: address,
        phone: phone,
        licenseNo: licenseNo,
        licenseType: licenseType,
        licenseIssueDate: licenseIssueDate,
        licenseExpiryDate: licenseExpiryDate,
        roles: roles,
        logbookHours: logbookHours[
            {date,
            startTime,
            endTime,
            travelTime
            }
        ],
      }
      const newArray = [...logbookHours]
      const headers = new Headers()
      headers.append('Authorization',`Bearer ${localStorage.getItem('token')}`);
      headers.append("Content-Type", "application/json")
      const requestOptions = {
          method: "PUT",
          headers,
          body: JSON.stringify(learner),
          redirect: "follow"
      };
      await fetch(`http://localhost:8080/account/${id}`, requestOptions);
      
    //    navigate(`/account/me`);
    }

    function drivingInstructor(){
        return(
            travelTime * 3
        )
    }

  return (
    <div>
      <h2>New Learning Hours</h2>
      <h3>{learner._id}</h3>
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
            <label>Driving Instructor</label><input type="checkbox" id="myCheck" onClick={() => drivingInstructor()}/>
            <button onClick={addTrip}>Add</button>
    </div>
  )
}
