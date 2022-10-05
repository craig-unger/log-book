import React from "react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "../App";

export default function DrivingHours() {
  const [token, setToken] = useContext(TokenContext);
  const navigate = useNavigate();
  const [user, setUser] = useState();
  let totalTime = 120;
  let nightHours = 20;

  useEffect(() => {
    let config = {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    };

    fetch(`http://localhost:8080/account/me`, config)
      .then((r) => r.json())
      .then((j) => setUser(j))
      .catch((e) => alert(e.message));
  }, [token]);

  if (!user) {
    return <div>...loading</div>;
  }
  function formatDate(date) {
    var dateObject = new Date(date);
    var dd = String(dateObject.getDate()).padStart(2, "0");
    var mm = String(dateObject.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = dateObject.getFullYear();
    return dd + "/" + mm + "/" + yyyy;
  }

  return (
    <div className="Div-border">
      <h2>Driving Hours</h2>
      <h3>
        {user.firstName} {user.lastName}
      </h3>
      <div>
        <button onClick={() => navigate("/user/drivinghours/newentry")}>
          Add Entry
        </button>
        <button onClick={() => navigate("/user/license")}>
          Back to Licence details
        </button>
      </div>
      <div>
        <div>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Instructor Trip</th>
                <th>Night Hours</th>
                <th>Travel Time</th>
              </tr>
            </thead>
            <tbody>
              {user.logbookHours.map((le) => {
                if (le.instructor) {
                  totalTime -= le.travelTime * 3;
                } else totalTime -= le.travelTime;
                if(le.nightHours){
                  nightHours -= le.travelTime
                }
                return (
                  <tr key={le._id}>
                    <td>{formatDate(le.date)}</td>
                    <td>{le.startTime}</td>
                    <td>{le.endTime}</td>
                    <td>{le.instructor ? "Yes" : "No"}</td>
                    <td>{le.nightHours ? "Yes" : "No"}</td>
                    <td>
                      {le.travelTime && le.instructor
                        ? le.travelTime * 3
                        : le.travelTime}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <h2 className="p-10">Total Learning Hours Remaining: {totalTime}</h2>
      <h3>Night Hours Remaining: {nightHours}</h3>
    </div>
  );
}
