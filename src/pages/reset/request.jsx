import React from "react";
import { Layout } from "../../generic/base";
import { Helmet } from "react-helmet";
import ResetRequestForm from "./components/RequestForm";

class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <Layout>
        <Helmet>
          <title>Password Reset Verify</title>
        </Helmet>
        <div className="container-fluid mt-5">
          <div className="row flex-center">
            <div className="col-md-4">
              <ResetRequestForm />
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default View;
