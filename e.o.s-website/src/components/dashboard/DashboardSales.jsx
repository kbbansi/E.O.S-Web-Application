import React from "react";
import Sales from "./Sales";
import Sidebar from "./Sidebar";

export default function (props) {
  return (
    <React.Fragment>
      <div className="wrapper">
        <Sidebar />
        <Sales />
      </div>
    </React.Fragment>
  );
}
