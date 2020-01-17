import React from "react";
import { Layout } from "../generic/base";
import { Helmet } from "react-helmet";

function View() {
  return (
    <Layout>
      <Helmet>
        <title>Page Not Found</title>
      </Helmet>
      <div className="mt-5" style={{ height: "100vh" }}>
        <h2 className="text-center">Page Not Found!</h2>
      </div>
    </Layout>
  );
}

export default View;
