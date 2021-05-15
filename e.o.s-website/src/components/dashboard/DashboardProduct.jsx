import React from "react";
//import Product from "./Product";
import Sidebar from "./Sidebar";
import UserDashboardComponent from "./UserDashboardComponent";

export default function DashboardProduct(props) {
  return (
    <div className="wrapper">
      <Sidebar />
      <UserDashboardComponent />
    </div>
  );
}
