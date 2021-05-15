import React, { useEffect, useState } from "react";
import $ from "jquery";
// import Masonry from "react-masonry-css";
import HomePageSidebar from "./HomePageSidebar";
import axios from "axios";
import { Link } from "react-router-dom";
import { serverUrl } from "../../server";

export default function MainContent(props) {
  // const server_url = "https://eos-adinkrah-enterprise-api.herokuapp.com/";
  const [products, setProducts] = useState([]);
  const [alreadyFetched, setAlreadyFetched] = useState(false);

  useEffect(() => {
    //masonryFunc();
    if (!alreadyFetched) {
      fetchProducts();
      setAlreadyFetched(true);
    }
  });

  const fetchProducts = () => {
    axios
      .get(`${serverUrl}product`)
      .then((res) => {
        setProducts(res.data.message);
        masonryFunc();
      })
      .catch((e) => console.log(e));
  };

  const masonryFunc = () => {
    var $window = $(window);

    var proCata = $(".amado-pro-catagory");
    var singleProCata = ".single-products-catagory";

    console.log($.fn.imagesLoaded);

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
    console.log("first two");
  };
  return (
    <div className="main-content-wrapper d-flex clearfix">
      <div className="mobile-nav">
        <div className="amado-navbar-brand">
          <a href="index.html">
            <img src="img/core-img/logo.png" alt="" />
          </a>
        </div>
        <div className="amado-navbar-toggler">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <HomePageSidebar />
      <div className="products-catagories-area clearfix">
        <div className="amado-pro-catagory clearfix d-flex wrap">
          {products.map((product) => (
            <div className="single-products-catagory clearfix">
              <Link to={`/products/${product.id}`}>
                <img src={product.productImage} alt="" />
                <div className="hover-content">
                  <div className="line"></div>
                  <p>{`From $${product.price}`}</p>
                  <h4>{product.productName}</h4>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
