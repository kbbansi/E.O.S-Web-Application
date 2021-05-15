import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { serverUrl } from "../../server";
import HomePageSidebar from "../homepage2/HomePageSidebar";

export default function RegisterMain(props) {
  // const server_url = "https://eos-adinkrah-enterprise-api.herokuapp.com/";
  let history = useHistory();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [otherNames, setOtherNames] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  const registerRequest = (e) => {
    e.preventDefault();
    const data = {
      firstName,
      lastName,
      otherNames,
      email,
      password,
      contactNo: contactNumber,
      userType: 2,
    };

    axios
      .post(`${serverUrl}users/create`, data)
      .then((res) => {
        alert("Registration successful");
        history.push("/login");
        console.log(res.data);
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
                  <h2>Register</h2>
                </div>

                <form onSubmit={registerRequest}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="first_name"
                        placeholder="First Name"
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="last_name"
                        ff
                        placeholder="Last Name"
                        required
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="first_name"
                        placeholder="Other Names"
                        required
                        onChange={(e) => setOtherNames(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="last_name"
                        placeholder="Contact Number"
                        required
                        onChange={(e) => setContactNumber(e.target.value)}
                      />
                    </div>
                    <div className="cart-btn mt-10 ml-3">
                      <a
                        href="#"
                        className="btn amado-btn w-100"
                        onClick={registerRequest}
                      >
                        Register
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
