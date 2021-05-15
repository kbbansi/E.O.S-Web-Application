import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

export default function HomePageSidebar(props) {
  let history = useHistory();
  const server_url = "https://pwilson77.github.io/ecom_app/";
  const [isChecked, setIsChecked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (!isChecked) {
      let bool = localStorage.getItem("loggedIn");
      console.log(bool === "true");
      if (bool === "true") setIsLoggedIn(true);
      setIsChecked(true);
    }
  });

  const logoutUser = () => {
    localStorage.removeItem("user_details");
    localStorage.setItem("loggedIn", false);
    setIsLoggedIn(false);
    history.push("/login");
  };

  return (
    <header className="header-area clearfix">
      <div className="nav-close">
        <i className="fa fa-close" aria-hidden="true"></i>
      </div>
      <div className="logo">
        <a href="#">
          <img src={`${server_url}assets/img/logo-transparent.png`} alt="" />
        </a>
      </div>
      <nav className="amado-nav">
        <ul>
          <li className="active">
            <Link to="/">Home</Link>
          </li>
          {/* <li>
            <Link to="/product">Product</Link>
          </li> */}
          <li>
            <Link to="/cart">Cart</Link>
          </li>
          {/* <li>
            <Link to="/checkout">Checkout</Link>
          </li> */}
          {isLoggedIn ? (
            <React.Fragment>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <a href="#" onClick={logoutUser}>
                  Logout
                </a>
              </li>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </React.Fragment>
          )}
        </ul>
      </nav>
      {/* <div className="amado-btn-group mt-30 mb-100">
        <a href="#" className="btn amado-btn mb-15">
          %Discount%
        </a>
        <a href="#" className="btn amado-btn active">
          New this week
        </a>
      </div>
      <div className="cart-fav-search mb-100">
        <a href="cart.html" className="cart-nav">
          <img src="assets/img/core-img/cart.png" alt="" /> Cart{" "}
          <span>(0)</span>
        </a>
        <a href="#" className="fav-nav">
          <img src="assets/img/core-img/favorites.png" alt="" /> Favourite
        </a>
        <a href="#" className="search-nav">
          <img src="assets/img/core-img/search.png" alt="" /> Search
        </a>
      </div> */}
      <div className="social-info d-flex justify-content-between">
        <a href="#">
          <i className="fa fa-pinterest" aria-hidden="true"></i>
        </a>
        <a href="#">
          <i className="fa fa-instagram" aria-hidden="true"></i>
        </a>
        <a href="#">
          <i className="fa fa-facebook" aria-hidden="true"></i>
        </a>
        <a href="#">
          <i className="fa fa-twitter" aria-hidden="true"></i>
        </a>
      </div>
    </header>
  );
}
