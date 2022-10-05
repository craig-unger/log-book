import React from "react";
import { Outlet } from "react-router-dom";
import UserInfo from "./UserInfo";

export default function Home() {
  return (
    <div>
      <div className="Menu-div">
        <UserInfo />
      </div>
      <Outlet />
      <img
        className="mx-auto"
        src="/images/snsw-logo.png"
        alt="Service NSW Logo"
      />
    </div>
  );
}
