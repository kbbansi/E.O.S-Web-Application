import React from "react";
import { Link } from "react-router-dom";

export default function DashboardFooter(props) {
  return (
    <footer className="footer">
      <div className="container-fluid">
        <nav className="pull-left">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
            {/* <li>
                <a href="#">Portfolio</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li> */}
          </ul>
        </nav>
        {/* <p className="copyright pull-right">
            &copy; <script>document.write(new Date().getFullYear())</script>{" "}
            <a href="http://www.creative-tim.com">Creative Tim</a>, made with
            love for a better web
          </p> */}
      </div>
    </footer>
  );
}
