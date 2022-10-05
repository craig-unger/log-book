import { useContext, useState } from "react";
import { Link, Outlet } from "react-router-dom"
import { TokenContext } from "../App";
import UserInfo from "./UserInfo"

export default function Home(){


    const [token,setToken]  = useContext(TokenContext); 

    return (
        <div>
            <div className="Menu-div">
            <UserInfo />
                <Link to={"/"}>Home</Link> 
                {/* <Link to={"/tickets"}>Tickets</Link>  */}
                <Link to={"/tickets"}>| CSR Login |</Link>
                {/* <Link to={"/tickets/create"}>Submit Ticket</Link>  */}               
            </div>
            <Outlet />

        </div>
  )
}