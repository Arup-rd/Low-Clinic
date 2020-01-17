import React from "react";
import Navbar from "./nav";
import Footer from "./index/footer";

function Layout(props) {
  return (
    <div>
      <div className="mt-5"></div>
      <Navbar />
      <div style={{ height: "50px" }} />
      <div style={{ minHeight: "50vh" }}>{props.children}</div>
      <Footer></Footer>
    </div>
  );
}

export { Layout };
