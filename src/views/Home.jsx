import { useState } from "react";
import { Link, Outlet } from "react-router-dom"
import UserInfo from "./UserInfo"

export default function Home(){


    const [token,setToken]  = useState(localStorage.getItem("token")); 

    return (
        <div>
            <div className="Menu-div">
            <UserInfo token={token}/>
                <Link to={"/"}>Home</Link> 
                {/* <Link to={"/tickets"}>Tickets</Link>  */}
                <Link to={"/tickets"}>| CSR Login |</Link>
                {/* <Link to={"/tickets/create"}>Submit Ticket</Link>  */}               
            </div>
            <Outlet context={[token,setToken]}/>

        </div>
  )
}