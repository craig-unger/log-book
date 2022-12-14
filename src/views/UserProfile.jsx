import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "../App";
import { isInRole } from "../identity";

export default function UserProfile() {
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

  //JSX
  if (!user) {
    return <div>Not Found</div>;
  } else if (token && isInRole(token, "admin")) {
    return (
      <div className="Div-border">
        <div>
          <h2>Admin Profile</h2>
        </div>
        <div className="label-div">
          <label>ID: {user?._id}</label>
        </div>
        <div className="label-div">
          <label>First Name: {user?.firstName}</label>
        </div>
        <div className="label-div">
          <label>Last Name: {user?.lastName}</label>
        </div>
        <div className="label-div">
          <label>Address: {user?.address}</label>
        </div>
        <div className="label-div">
          <label>Phone: {user?.phone}</label>
        </div>
        <button onClick={() => navigate("/user/edit")}>Edit Profile</button>
        {token && isInRole(token, "admin") && (
          <button onClick={() => navigate("/admin")}>View Customers</button>
        )}
      </div>
    );
  } else {
    return (
      <div className="Div-border">
        <div>
          <h2>Customer Profile</h2>
        </div>
        <div className="label-div">
          <label>ID: {user?._id}</label>
        </div>
        <div className="label-div">
          <label>First Name: {user?.firstName}</label>
        </div>
        <div className="label-div">
          <label>Last Name: {user?.lastName}</label>
        </div>
        <div className="label-div">
          <label>Address: {user?.address}</label>
        </div>
        <div className="label-div">
          <label>Phone: {user?.phone}</label>
        </div>
        <button onClick={() => navigate("/user/edit")}>Edit Profile</button>
        <button onClick={() => navigate("/user/license")}>View Licence</button>
      </div>
    );
  }
}
