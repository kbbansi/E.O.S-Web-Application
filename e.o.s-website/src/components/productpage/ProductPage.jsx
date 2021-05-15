import React from "react";
import FooterArea from "../homepage2/FooterArea";
import NewsletterArea from "../homepage2/NewsletterArea";
import SearchWrapper from "../homepage2/SearchWrapper";
import ProductMainContent from "./ProductMainContent";

export default function ProductPage(props) {
  return (
    <React.Fragment>
      <SearchWrapper />
      <ProductMainContent productId={props.productId} />
      <NewsletterArea />
      <FooterArea />
    </React.Fragment>
  );
}
