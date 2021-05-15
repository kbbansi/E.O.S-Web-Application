import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardFooter from "./DashboardFooter";
import Navbar from "./Navbar";

export default function UserDashboardComponent(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [otherNames, setOtherNames] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contactNo, setContactNumber] = useState("");
  const [userType, setUserType] = useState("");
  const [fetch, setFetch] = useState(false);

  const fetchUserDetails = () => {
    let obj = JSON.parse(localStorage.getItem("user_details"));
    setFirstName(obj.firstName);
    setLastName(obj.lastName);
    setOtherNames(obj.setOtherNames);
    setEmail(obj.email);
    setContactNumber(obj.contactNo);
  };

  useEffect(() => {
    if (!fetch) {
      fetchUserDetails();
      setFetch(true);
    }
  });

  return (
    <div className="main-panel">
      <Navbar />
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8">
              <div className="card">
                <div className="header">
                  <h4 className="title">Edit User Details</h4>
                </div>
                <div className="content">
                  <form>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>First Name</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="First Name"
                            name="productName"
                            defaultValue={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Last Name</label>
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Last Name"
                            name="price"
                            defaultValue={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label>Other Names</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Other Names"
                            name="description"
                            defaultValue={otherNames}
                            onChange={(e) => setOtherNames(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>Email</label>
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Product Stock"
                            name="stock"
                            defaultValue={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>Contact Number</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Product Stock"
                            name="stock"
                            defaultValue={contactNo}
                            onChange={(e) => setContactNumber(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-info btn-fill pull-right"
                    >
                      Edit Details
                    </button>
                    <div className="clearfix"></div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-md-4 card"></div>
          </div>
        </div>
      </div>

      <DashboardFooter />
    </div>
  );
}
