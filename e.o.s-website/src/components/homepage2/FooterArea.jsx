import React from "react";
import { Link } from "react-router-dom";

export default function FooterArea(props) {
  const server_url = "https://pwilson77.github.io/ecom_app/";

  return (
    <React.Fragment>
      <footer className="footer_area clearfix" style={{ marginTop: "0px" }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 col-lg-4">
              <div className="single_widget_area">
                <div className="footer-logo mr-50">
                  <a href="#">
                    <img
                      src={`${server_url}assets/img/logo-transparent.png`}
                      alt=""
                    />
                  </a>
                </div>
                {/* <p className="copywrite">
                  Copyright &copy; All rights reserved | This template is made
                  with
                  <i className="fa fa-heart-o" aria-hidden="true"></i> by
                  <a href="https://colorlib.com" target="_blank">
                    Colorlib
                  </a>{" "}
                  & Re-distributed by
                  <a href="https://themewagon.com/" target="_blank">
                    Themewagon
                  </a>
                </p> */}
              </div>
            </div>

            <div className="col-12 col-lg-8">
              <div className="single_widget_area">
                <div className="footer_menu">
                  <nav className="navbar navbar-expand-lg justify-content-end">
                    <div
                      className="collapse navbar-collapse"
                      id="footerNavContent"
                    >
                      <ul className="navbar-nav ml-auto">
                        <li className="nav-item active">
                          <Link className="nav-link" to="/">
                            Home
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to="/cart">
                            Cart
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to="/login">
                            Product
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to="/register">
                            Register
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
}
