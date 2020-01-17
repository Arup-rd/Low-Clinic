import React from "react";
import { Layout } from "../../generic/base";
import { Helmet } from "react-helmet";

function View(props) {
  return (
    <Layout>
      <Helmet>
        <title>Terms</title>
      </Helmet>
      <div className="container-fluid mt-5" style={{ height: "75vh" }}>
        <div className="row flex-center">
          <div className="col-md-10">
            <h3 className="font-weight-bolder text-center">
              Terms and Conditions
            </h3>
            <p>
              You may consult this list to find the Privacy Policy for each of
              the advertising partners of www.askriashad.com. Third-party ad
              servers or ad networks uses technologies like cookies, JavaScript,
              or Web Beacons that are used in their respective advertisements
              and links that appear on www.askriashad.com, which are sent
              directly to users' browser. They automatically receive your IP
              address when this occurs. These technologies are used to measure
              the effectiveness of their advertising campaigns and/or to
              personalize the advertising content that you see on websites that
              you visit. www.askriashad.com would record users IP, geographical
              location and other information gathered by signup process, which
              may potentially be shared with our partners to improve the user
              experience and the improvement of the website. Note that
              www.askriashad.com has no access to or control over these cookies
              that are used by third-party advertisers.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default View;
