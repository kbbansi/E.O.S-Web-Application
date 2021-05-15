import React from "react";
import FooterArea from "./FooterArea";
import MainContent from "./MainContent";
import NewsletterArea from "./NewsletterArea";
import SearchWrapper from "./SearchWrapper";

export default function Home2(props) {
  return (
    <React.Fragment>
      <SearchWrapper />
      <MainContent />
      <NewsletterArea />
      <FooterArea />
    </React.Fragment>
  );
}
