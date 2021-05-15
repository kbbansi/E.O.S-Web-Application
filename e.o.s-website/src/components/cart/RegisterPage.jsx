import React from "react";
import FooterArea from "../homepage2/FooterArea";
import NewsletterArea from "../homepage2/NewsletterArea";
import SearchWrapper from "../homepage2/SearchWrapper";
import CheckoutMain from "./CheckoutMain";
import RegisterMain from "./RegisterMain";

export default function RegisterPage(props) {
  return (
    <React.Fragment>
      <SearchWrapper />
      <RegisterMain />
      <NewsletterArea />
      <FooterArea />
    </React.Fragment>
  );
}
