import React from "react";
import FooterArea from "../homepage2/FooterArea";
import NewsletterArea from "../homepage2/NewsletterArea";
import SearchWrapper from "../homepage2/SearchWrapper";
import CheckoutMain from "./CheckoutMain";

export default function CheckoutPage(props) {
  return (
    <React.Fragment>
      <SearchWrapper />
      <CheckoutMain />
      <NewsletterArea />
      <FooterArea />
    </React.Fragment>
  );
}
