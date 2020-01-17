import React from "react";
import { Layout } from "../../generic/base";
import { Loader } from "../../generic/widgets/misc";
import { connect } from "react-redux";
import { resetVerify } from "../../controller/actions/reset";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import ResetForm from "./components/ResetForm";

class View extends React.Component {
  static propTypes = {
    isVerifying: PropTypes.bool.isRequired,
    isValid: PropTypes.bool.isRequired,
    isInvalid: PropTypes.bool.isRequired,
    message: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      token: null,
      isValidCall: true
    };
  }

  componentDidMount() {
    const params = new URLSearchParams(this.props.location.search);
    if (!params.get("token")) {
      this.setState({
        isValidCall: false
      });
    } else {
      this.setState({
        token: params.get("token")
      });
      this.props.resetVerify(params.get("token"));
    }
  }

  getView() {
    if (this.props.isVerifying) {
      return <Loader />;
    }
    if (this.props.isInvalid) {
      return (
        <p className="text-center text-danger h3">{this.props.message.token}</p>
      );
    }
    if (this.props.isValid) {
      return <ResetForm />;
    }
  }

  render() {
    if (!this.state.isValidCall) {
      return (
        <Layout>
          <Helmet>
            <title>Password Reset Verification</title>
          </Helmet>
          <p className="mt-5 text-center h5">Invalid Call</p>
        </Layout>
      );
    }
    return (
      <Layout>
        <Helmet>
          <title>Password Reset Verification</title>
        </Helmet>
        <div className="mt-5">
          <div className="container-fluid">
            <div className="row flex-center">
              <div className="col-md-4">{this.getView()}</div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

const mapToPropStates = state => ({
  isVerifying: state.reset.isVerifying,
  isValid: state.reset.isValid,
  isInvalid: state.reset.isInvalid,
  message: state.reset.message
});

export default connect(mapToPropStates, { resetVerify })(View);
