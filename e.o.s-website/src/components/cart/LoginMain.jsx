import axios from "axios";
import React, { useState } from "react";
import { useAlert } from "react-alert";
import { serverUrl } from "../../server";
import HomePageSidebar from "../homepage2/HomePageSidebar";

export default function LoginMain(props) {
  // const server_url = "https://eos-adinkrah-enterprise-api.herokuapp.com/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const alert = useAlert();

  const loginFunc = () => {
    const data = { email, password };
    axios
      .post(`${serverUrl}auth/login`, data)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("user_details", JSON.stringify(res.data.message));
        localStorage.setItem("loggedIn", true);
        alert.show("Login Successful");
        props.history.push("/");
      })
      .catch((e) => console.log(e));
  };
  return (
    <div className="main-content-wrapper d-flex clearfix">
      <div className="mobile-nav">
        <div className="amado-navbar-brand">
          <a href="index.html">
            <img src="assets/img/core-img/logo.png" alt="" />
          </a>
        </div>
        <div className="amado-navbar-toggler">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <HomePageSidebar />
      <div className="cart-table-area section-padding-100">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-lg-8">
              <div className="checkout_details_area mt-50 clearfix">
                <div className="cart-title">
                  <h2>Login</h2>
                </div>

                <form onSubmit={loginFunc}>
                  <div className="row">
                    <div className="col-md-8 mb-3">
                      <input
                        type="email"
                        className="form-control"
                        id="first_name"
                        placeholder="Email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-8 mb-3">
                      <input
                        type="password"
                        className="form-control"
                        id="last_name"
                        placeholder="Password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="cart-btn mt-10 ml-3">
                      <a
                        href="#"
                        className="btn amado-btn w-100"
                        onClick={loginFunc}
                      >
                        Login
                      </a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-12 col-lg-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
