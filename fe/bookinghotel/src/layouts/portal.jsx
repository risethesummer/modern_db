import { Fragment } from "react";
import Header from "./header";
import Footer from "./footer";

export default function Portal(props) {
  return (
    <Fragment>
      <Header />
      {props.children}
      <Footer />
    </Fragment>
  );
}
