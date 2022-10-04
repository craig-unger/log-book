import { useEffect,useState } from "react";
import { Outlet } from "react-router-dom";
import UserInfo from "./UserInfo";
// import { fetchAllUsers } from "../../web-services";


export default function Layout(){

    
    return(
        <div>
            <h1>Account Portal</h1>
            <Outlet />
        </div>       
    ); 
}