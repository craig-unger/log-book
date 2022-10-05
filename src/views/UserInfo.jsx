import { useContext } from "react";
import { Link } from "react-router-dom";
import { TokenContext } from "../App";
import { parseJwt } from "../web-services";

export default function UserInfo() {
  const [token, setToken] = useContext(TokenContext);

  // Function for logout
  function logout() {
    setToken(undefined);
  }

  if (!token) {
    return (
      <div>
        <Link to="/login">Sign In</Link> |<Link to="/register"> Register</Link>
      </div>
    );
  }
  let payload = parseJwt(token);
  return (
    <div>
      <div className="User-info">
        <h2 className="text-right">Logged in as {payload.firstName}</h2>
      </div>
      <Link to="/user/profile">Personal Information</Link>
      <br />
      <Link to={"/"} onClick={logout}>
        Logout
      </Link>
    </div>
  );
}
