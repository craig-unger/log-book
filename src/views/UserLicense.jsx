import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "../App";

export default function UserLicense() {
  const [token, setToken] = useContext(TokenContext);
  const [user, setUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    let config = {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    };

    fetch(`http://localhost:8080/account/me`, config)
      .then((r) => r.json())
      .then((j) => {
        setUser(j);
      })
      .catch((e) => alert(e.message));
  }, [token]);

  function formatDate(date) {
    var dateObject = new Date(date);
    var dd = String(dateObject.getDate()).padStart(2, "0");
    var mm = String(dateObject.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = dateObject.getFullYear();
    return dd + "/" + mm + "/" + yyyy;
  }
  //JSX
  if (!user) {
    return <div>...loading</div>;
  } else if (user.licenseNo !== "N/A") {
    return (
      <div className="Div-border">
        <div>
          <h2>Licence Details</h2>
        </div>
        <div className="label-div">
          <label>Customer ID: {user?._id}</label>
        </div>
        <div className="label-div">
          <label>First Name: {user?.firstName}</label>
        </div>
        <div className="label-div">
          <label>Last Name: {user?.lastName}</label>
        </div>
        <div className="label-div">
          <label>Licence Number: {user?.licenseNo}</label>
        </div>
        <div className="label-div">
          <label>Licence Type: {user?.licenseType}</label>
        </div>
        <div className="label-div">
          <label>Issue Date: {formatDate(user?.licenseIssueDate)}</label>
        </div>
        <div className="label-div">
          <label>Expiry Date: {formatDate(user?.licenseExpiryDate)}</label>
        </div>
        <button onClick={() => navigate("/user/drivinghours")}>
          Driving Hours
        </button>
        <button onClick={() => navigate("/user/profile")}>
          Back to Profile
        </button>
      </div>
    );
  } else {
    return (
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
        <button onClick={() => navigate("/user/profile")}>
          Back to Profile
        </button>
      </div>
    );
  }
}
