import {  Outlet } from "react-router-dom";
import UserInfo from "./UserInfo";
import '../App.css';
import React from "react";

export default function Home() {

  return (
    <div>
      <div className="Menu-div">
        <UserInfo />
        </div>
      <Outlet />
      <img src="/images/snsw-logo-2.png" alt="Service NSW Logo" />
      <div className="Div-footer">
        <div className="Div-footer-text">
          <p>ACKNOWLEDGEMENT OF COUNTRY</p>
        </div>
        <div>
          We acknowledge the Traditional Custodians of NSW, and their continued
          connection to land, water and culture. We pay our respects to Elders
          past, present and emerging.
        </div>
      </div>
      <p>Instructor - Peter Holman and Luke Parker.</p>
      <p>Created by - Craig, Masud and Pawan.</p>
    </div>
  );
}
