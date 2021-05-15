import React from "react";
import FooterArea from "../homepage2/FooterArea";
import NewsletterArea from "../homepage2/NewsletterArea";
import SearchWrapper from "../homepage2/SearchWrapper";
import LoginMain from "./LoginMain";

export default function LoginPage(props) {
  return (
    <React.Fragment>
      <SearchWrapper />
      <LoginMain history={props.history} />
      <NewsletterArea />
      <FooterArea />
    </React.Fragment>
  );
}
