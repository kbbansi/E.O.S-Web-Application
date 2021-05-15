import axios from "axios";
import React, { useEffect, useState } from "react";
import { serverUrl } from "../../server";
import Navbar from "./Navbar";

export default function Sales(props) {
  // const server_url = "https://eos-adinkrah-enterprise-api.herokuapp.com/";
  const [orders, setOrders] = useState([]);
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    if (!isFetched) {
      fetchUserOrders();
      setIsFetched(true);
    }
  });

  const fetchUserOrders = () => {
    let user_details = JSON.parse(localStorage.getItem("user_details"));
    axios
      .get(`${serverUrl}orders/${user_details.id}`)
      .then((res) => setOrders(res.data.message))
      .catch((e) => alert("Error with fetching"));
  };

  return (
    <React.Fragment>
      <div class="main-panel">
        <Navbar />
        <div class="content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-6">
                <div class="card">
                  <div class="header">
                    <h4 class="title">Your Orders</h4>
                    <p class="category">Orders</p>
                  </div>
                  <div class="content table-responsive table-full-width">
                    <table class="table table-hover table-striped">
                      <thead>
                        <th>ID</th>
                        <th>Product Name</th>
                        <th>Total</th>
                        <th>Date</th>
                      </thead>
                      <tbody>
                        {orders.map((order) => (
                          <tr>
                            <td>{order.orderID}</td>
                            <td>{order.products}</td>
                            <td>{order.total}</td>
                            <td>{order.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer class="footer">
          <div class="container-fluid">
            <nav class="pull-left">
              <ul>
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">Company</a>
                </li>
                <li>
                  <a href="#">Portfolio</a>
                </li>
                <li>
                  <a href="#">Blog</a>
                </li>
              </ul>
            </nav>
            <p class="copyright pull-right">
              &copy; <script>document.write(new Date().getFullYear())</script>{" "}
              <a href="http://www.creative-tim.com">Creative Tim</a>, made with
              love for a better web
            </p>
          </div>
        </footer>
      </div>
    </React.Fragment>
  );
}
