import React from "react";
import { Layout } from "../../generic/base";
import { Loader } from "../../generic/widgets/misc";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { verifyAccount } from "../../controller/actions/auth";
import PropTypes from "prop-types";

class View extends React.Component {
  static propTypes = {
    isVerificationLoading: PropTypes.bool.isRequired,
    isVerificationFailed: PropTypes.bool.isRequired,
    isVerificationSuccess: PropTypes.bool.isRequired,
    verifyAccount: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
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
      this.props.verifyAccount(params.get("token"));
    }
  }

  getView() {
    if (!this.state.isValidCall) {
      return (
        <div className="flex-center">
          <h4 className="text-danger text-center">Invalid Request</h4>
        </div>
      );
    }
    if (this.props.isVerificationLoading) {
      return <Loader />;
    }
    if (this.props.isVerificationFailed) {
      return (
        <div className="flex-center">
          <div className="alert alert-danger">
            <strong className="text-center">Verification Failed</strong>
          </div>
        </div>
      );
    }
    if (this.props.isVerificationSuccess) {
      return (
        <div className="flex-center">
          <h4 className="text-center">Welcome to AksRiashad</h4>
        </div>
      );
    }
  }

  render() {
    return (
      <Layout>
        <Helmet>
          <title>Account Verification</title>
        </Helmet>
        <div className="mt-5">{this.getView()}</div>
      </Layout>
    );
  }
}

const mapToPropState = state => ({
  isVerificationSuccess: state.auth.isVerificationSuccess,
  isVerificationLoading: state.auth.isVerificationLoading,
  isVerificationFailed: state.auth.isVerificationFailed
});

export default connect(mapToPropState, { verifyAccount })(View);
