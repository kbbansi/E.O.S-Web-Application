import React, { useEffect, useState } from "react";
import HomePageSidebar from "../homepage2/HomePageSidebar";
import { list } from "cart-localstorage";
import { Link } from "react-router-dom";
import axios from "axios";
import { PaystackButton } from "react-paystack";
import { serverUrl } from "../../server";

export default function CartMain(props) {
  // const server_url = "https://eos-adinkrah-enterprise-api.herokuapp.com/";
  let publicKey = "pk_test_7e9aa74526402bc6c81165bb99449e296a1b157c";
  const [total, setTotal] = useState(0);
  const [checkCal, setCheckCal] = useState(false);
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const calculateCart = () => {
    let tot = list().reduce((x, y) => x + y.price * y.quantity, 0);
    let user_details = JSON.parse(localStorage.getItem("user_details"));
    console.log(user_details);
    if (user_details != null) {
      setUser(user_details);
      setLoggedIn(true);
    }
    setTotal(tot);
    setCheckCal(true);
  };

  useEffect(() => {
    if (!checkCal) {
      calculateCart();
    }
  });

  const handleCheckout = async () => {
    // e.preventDefault();
    let user_details = JSON.parse(localStorage.getItem("user_details"));

    if (list().length === 0) {
      alert("There are no items in your cart");
    }

    list().map((item) => {
      let data = {
        userID: user_details.id,
        productID: item.id,
        quantity: item.quantity,
      };
      axios
        .post(`${serverUrl}orders/create`, data)
        .then((res) => {
          console.log(res.data);
          alert(res.data.message);
        })
        .catch((e) => {
          alert(e.data);
        });
    });

    localStorage.removeItem("__cart");
    calculateCart();
  };

  const componentProps = {
    email: "test@gmail.com",
    amount: parseInt(total) * 100,
    currency: "GHS",
    metadata: {
      name: "user.firstName",
      phone: "user.lastName",
    },
    publicKey,
    text: "Pay Now",
    onSuccess: () => {
      handleCheckout();
      alert("Thanks for doing business with us! Come back soon!!");
    },
    onClose: () => alert("Wait! You need this oil, don't go!!!!"),
  };

  return (
    <div className="main-content-wrapper d-flex clearfix">
      <div className="mobile-nav">
        <div className="amado-navbar-brand">
          <a href="#">
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
              <div className="cart-title mt-50">
                <h2>Shopping Cart</h2>
              </div>

              <div className="cart-table clearfix">
                <table className="table table-responsive">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list().map((item) => (
                      <tr>
                        <td className="cart_product_img">
                          <Link to="/">
                            <img src={item.image} alt="Product" />
                          </Link>
                        </td>
                        <td className="cart_product_desc">
                          <h5>{item.name}</h5>
                        </td>
                        <td className="price">
                          <span>{`$${item.price}`}</span>
                        </td>
                        <td className="qty">
                          <div className="qty-btn d-flex">
                            <p>{item.quantity}</p>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <div className="cart-summary">
                <h5>Cart Total</h5>
                <ul className="summary-table">
                  <li>
                    <span>subtotal:</span> <span>${total}</span>
                  </li>
                  <li>
                    <span>delivery:</span> <span>Free</span>
                  </li>
                  <li>
                    <span>total:</span> <span>${total}</span>
                  </li>
                </ul>
                <div className="cart-btn mt-100">
                  {loggedIn ? (
                    <PaystackButton
                      {...componentProps}
                      className="btn amado-btn w-100"
                    />
                  ) : (
                    <b> Please login before you can checkout</b>
                  )}

                  {/* <a
                    href="#"
                    className="btn amado-btn w-100"
                    onClick={handleCheckout}
                  >
                    Checkout
                  </a> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
