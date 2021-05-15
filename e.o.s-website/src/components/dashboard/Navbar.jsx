import React from "react";
import { useHistory } from "react-router";

export default function Navbar(props) {
  let history = useHistory();

  const logoutUser = () => {
    localStorage.removeItem("user_details");
    localStorage.setItem("loggedIn", false);
    history.push("/login");
  };

  return (
    <nav className="navbar navbar-default navbar-fixed">
      <div className="container-fluid">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle"
            data-toggle="collapse"
            data-target="#navigation-example-2"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="#">
            User
          </a>
        </div>
        <div className="collapse navbar-collapse">
          {/* <ul className="nav navbar-nav navbar-left">
                    <li>
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                            <i className="fa fa-dashboard"></i>
                            <p className="hidden-lg hidden-md">Dashboard</p>
                        </a>
                    </li>
                    <li className="dropdown">
                          <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                <i className="fa fa-globe"></i>
                                <b className="caret hidden-sm hidden-xs"></b>
                                <span className="notification hidden-sm hidden-xs">5</span>
                                <p className="hidden-lg hidden-md">
                                    5 Notifications
                                    <b className="caret"></b>
                                </p>
                          </a>
                          <ul className="dropdown-menu">
                            <li><a href="#">Notification 1</a></li>
                            <li><a href="#">Notification 2</a></li>
                            <li><a href="#">Notification 3</a></li>
                            <li><a href="#">Notification 4</a></li>
                            <li><a href="#">Another notification</a></li>
                          </ul>
                    </li>
                    <li>
                       <a href="">
                            <i className="fa fa-search"></i>
                            <p className="hidden-lg hidden-md">Search</p>
                        </a>
                    </li>
                </ul> */}

          <ul className="nav navbar-nav navbar-right">
            <li>
              <a href="">
                <p>Account</p>
              </a>
            </li>
            {/* <li className="dropdown">
                          <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                <p>
                                    Dropdown
                                    <b className="caret"></b>
                                </p>

                          </a>
                          <ul className="dropdown-menu">
                            <li><a href="#">Action</a></li>
                            <li><a href="#">Another action</a></li>
                            <li><a href="#">Something</a></li>
                            <li><a href="#">Another action</a></li>
                            <li><a href="#">Something</a></li>
                            <li className="divider"></li>
                            <li><a href="#">Separated link</a></li>
                          </ul>
                    </li> */}
            <li>
              <a href="#" onClick={logoutUser}>
                <p>Log out</p>
              </a>
            </li>
            <li className="separator hidden-lg hidden-md"></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
