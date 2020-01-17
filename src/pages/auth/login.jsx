import React from "react";
import { Layout } from "../../generic/base";
import { MDBInput, MDBBtn } from "mdbreact";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login } from "../../controller/actions/auth";
import { Redirect } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { GOOGLE_CLIENT_KEY } from "../../controller/actions/config";

class View extends React.Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool,
    isFailed: PropTypes.bool,
    message: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      requesting: false,
      isFailed: false
    };
    this.onPasswordInput = this.onPasswordInput.bind(this);
    this.onEmailInput = this.onEmailInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.googleLogFailed = this.googleLogFailed.bind(this);
    this.googleLogSuccess = this.googleLogSuccess.bind(this);
  }

  onPasswordInput(event) {
    this.setState({ password: event.target.value });
  }

  onEmailInput(event) {
    this.setState({ email: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    this.setState({
      requesting: true,
      isFailed: this.props.isFailed
    });
    this.props.login(this.state.email, this.state.password);
  }

  googleLogSuccess(res) {
    this.props.login(res.profileObj.email, res.profileObj.googleId);
  }

  googleLogFailed(res) {
    console.log(res);
  }

  formView() {
    const loadingView = (
      <MDBBtn
        type="reset"
        size="sm"
        style={{ width: "98%", fontSize: 15 }}
        disabled
      >
        <div className="spinner-border spinner-border-sm" /> Logging
      </MDBBtn>
    );

    const logView = (
      <MDBBtn
        type="submit"
        onClick={this.onSubmit}
        size="sm"
        style={{ width: "98%", fontSize: 15 }}
      >
        Login
      </MDBBtn>
    );

    return (
      <form onSubmit={this.onSubmit} method="POST">
        <MDBInput
          onChange={this.onEmailInput}
          label="Email"
          outline
          size="md"
          type="email"
        />
        <MDBInput
          onChange={this.onPasswordInput}
          type="password"
          label="Password"
          outline
          size="md"
        />
        {this.props.isLoading ? loadingView : logView}
      </form>
    );
  }

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/profile" />;
    }

    let errorView;
    if (this.props.isFailed) {
      errorView = (
        <div className="alert alert-danger">
          <strong>{this.props.message}</strong>
        </div>
      );
    }

    return (
      <Layout>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Login</title>
          <link rel="stylesheet" href="../static/css/pages/index.css" />
        </Helmet>
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ height: "90vh" }}
        >
          <h2 className="mb-3">Sign in to Ask Riashad</h2>
          <div className="col-md-4 list-group-item">
            {this.props.isFailed ? errorView : <span />}
            {this.formView()}
            <p
              className="lead text-center mt-2"
              style={{ fontSize: 14, color: "#666" }}
            >
              Forgot Password? <a href="/password-reset/request">Reset here</a>{" "}
            </p>
            <hr />
            <p
              className="lead text-center mt-2"
              style={{ fontSize: 16, color: "#666" }}
            >
              New to Ask Riashad? <a href="/signup">Create Account</a>{" "}
            </p>
            <div className="d-flex justify-content-center">
              <GoogleLogin
                clientId={GOOGLE_CLIENT_KEY}
                buttonText="LOGIN WITH GOOGLE"
                onSuccess={this.googleLogSuccess}
                onFailure={this.googleLogFailed}
                cookiePolicy={"single_host_origin"}
              />
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

const mapStateToLog = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading,
  isFailed: state.auth.isAuthenticationFailed,
  isSuccess: state.auth.isSuccess,
  message: state.auth.message
});

export default connect(mapStateToLog, { login })(View);
