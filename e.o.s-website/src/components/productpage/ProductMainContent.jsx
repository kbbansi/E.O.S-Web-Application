import axios from "axios";
import React, { useEffect, useState } from "react";
import HomePageSidebar from "../homepage2/HomePageSidebar";
import { add, exists, get, total, update } from "cart-localstorage";
import { Link } from "react-router-dom";
import $ from "jquery";

export default function ProductMainContent(props) {
  const publicKey = "pk_test_7e9aa74526402bc6c81165bb99449e296a1b157c";
  const server_url = "https://eos-adinkrah-enterprise-api.herokuapp.com/";
  const [productInfo, setProductInfo] = useState({});
  const [alreadyFetched, setAlreadyFetched] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    //masonryFunc();
    if (!alreadyFetched) {
      fetchProductInfo();
      setTimeout(masonryFunc, 5000);
      setAlreadyFetched(true);
    }
  });

  const addToCart = (e) => {
    e.preventDefault();
    if (exists(productInfo.id)) {
      let alreadyExisting = get(productInfo.id);
      update(
        productInfo.id,
        "quantity",
        parseInt(alreadyExisting.quantity) + parseInt(quantity)
      );
      alert("An existing product quantity has been updated");
    } else {
      add(
        {
          id: productInfo.id,
          name: productInfo.productName,
          price: parseInt(productInfo.price),
          image: productInfo.productImage,
        },
        parseInt(quantity)
      );
      alert("A new product has been added to cart");
    }
  };

  const fetchProductInfo = () => {
    axios
      .get(`${server_url}product/${props.productId}`)
      .then((res) => {
        setProductInfo(res.data.message);
        console.log("Fetched data");
      })
      .catch((e) => console.log(e.data));
  };

  const masonryFunc = () => {
    var proCata = $(".amado-pro-catagory");
    var singleProCata = ".single-products-catagory";
    console.log("test");
    if ($.fn.imagesLoaded) {
      proCata.imagesLoaded(function () {
        proCata.isotope({
          itemSelector: singleProCata,
          percentPosition: true,
          masonry: {
            columnWidth: singleProCata,
          },
        });
      });
    }
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
      <div className="single-product-area section-padding-100 clearfix">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mt-50">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="#">{productInfo.productName}</a>
                  </li>
                </ol>
              </nav>
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-lg-7">
              <div className="single_product_thumb">
                <div
                  id="product_details_slider"
                  className="carousel slide"
                  data-ride="carousel"
                >
                  <ol className="carousel-indicators"></ol>
                  <div className="carousel-inner">
                    <div className="carousel-item active carousel-con">
                      <a className="gallery_img" href="#">
                        <img
                          className="d-block w-100 carousel-img"
                          src={productInfo.productImage}
                          alt="First slide"
                        />
                      </a>
                    </div>
                    {/* <div className="carousel-item">
                      <a
                        className="gallery_img"
                        href="assets/img/product-img/pro-big-2.jpg"
                      >
                        <img
                          className="d-block w-100"
                          src="assets/img/product-img/pro-big-2.jpg"
                          alt="Second slide"
                        />
                      </a>
                    </div>
                    <div className="carousel-item">
                      <a
                        className="gallery_img"
                        href="assets/img/product-img/pro-big-3.jpg"
                      >
                        <img
                          className="d-block w-100"
                          src="assets/img/product-img/pro-big-3.jpg"
                          alt="Third slide"
                        />
                      </a>
                    </div>
                    <div className="carousel-item">
                      <a
                        className="gallery_img"
                        href="assets/img/product-img/pro-big-4.jpg"
                      >
                        <img
                          className="d-block w-100"
                          src="assets/img/product-img/pro-big-4.jpg"
                          alt="Fourth slide"
                        />
                      </a>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-5">
              <div className="single_product_desc">
                <div className="product-meta-data">
                  <div className="line"></div>
                  <p className="product-price">{`$${productInfo.price}`}</p>
                  <a href="product-details.html">
                    <h6>{productInfo.productName}/</h6>
                  </a>
                  <div className="ratings-review mb-15 d-flex align-items-center justify-content-between">
                    <div className="ratings">
                      <i className="fa fa-star" aria-hidden="true"></i>
                      <i className="fa fa-star" aria-hidden="true"></i>
                      <i className="fa fa-star" aria-hidden="true"></i>
                      <i className="fa fa-star" aria-hidden="true"></i>
                      <i className="fa fa-star" aria-hidden="true"></i>
                    </div>
                    {/* <div className="review">
                      <a href="#">Write A Review</a>
                    </div> */}
                  </div>
                  <p className="avaibility">
                    <i className="fa fa-circle"></i> In Stock
                  </p>
                </div>

                <div className="short_overview my-5">
                  <p>{productInfo.description}</p>
                </div>

                <form className="cart clearfix" onSubmit={addToCart}>
                  <div className="cart-btn d-flex mb-50">
                    <div className="quantity">
                      <p>
                        Qty
                        <input
                          type="number"
                          className="qty-text"
                          id="qty"
                          step="1"
                          min="1"
                          max="300"
                          name="quantity"
                          onChange={(e) => setQuantity(e.target.value)}
                        />
                      </p>
                    </div>
                  </div>
                  <button
                    type="submit"
                    name="addtocart"
                    value="5"
                    className="btn amado-btn"
                  >
                    Add to cart
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
