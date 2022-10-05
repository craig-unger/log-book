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
            </div>
            <Outlet />
            <img className="mx-auto" src="/images/snsw-logo.png" alt="Service NSW Logo"/>    

        </div>
  )
}