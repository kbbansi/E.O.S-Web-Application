import React from "react";
import MainPanel from "./MainPanel";
import Sidebar from "./Sidebar";

export default function Dashboard(params) {
    return (
        <React.Fragment>
            <div className="wrapper">
                <Sidebar />
                <MainPanel />
            </div>
        </React.Fragment>
    )
}