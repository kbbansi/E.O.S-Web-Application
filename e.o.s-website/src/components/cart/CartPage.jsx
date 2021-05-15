import React from "react";
import FooterArea from "../homepage2/FooterArea";
import NewsletterArea from "../homepage2/NewsletterArea";
import SearchWrapper from "../homepage2/SearchWrapper";
import CartMain from "./CartMain";

export default function CartPage(props) {
  return (
    <React.Fragment>
      <SearchWrapper />
      <CartMain />
      <NewsletterArea />
      <FooterArea />
    </React.Fragment>
  );
}
