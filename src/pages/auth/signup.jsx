import React from "react";
import { Layout } from "../../generic/base";
import {
  MDBInput,
  MDBBtn,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter
} from "mdbreact";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { signup } from "../../controller/actions/auth";
import { Redirect } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { GOOGLE_CLIENT_KEY } from "../../controller/actions/config";

const aggrement = (
  <div>
    By using our website, you hereby consent to our Privacy Policy and agree to
    its Terms and Conditions.
  </div>
);

class View extends React.Component {
  static propTypes = {
    signup: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isFailed: PropTypes.bool.isRequired,
    message: PropTypes.string,
    waitingForVerification: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      phone: "",
      gender: "M",
      password: "",
      confirmPassword: "",
      social: false,
      modal: false
    };

    this.onNameInput = this.onNameInput.bind(this);
    this.onEmailInput = this.onEmailInput.bind(this);
    this.onPhoneInput = this.onPhoneInput.bind(this);
    this.onGenderSelect = this.onGenderSelect.bind(this);
    this.onPasswordInput = this.onPasswordInput.bind(this);
    this.onConfirmPasswordInput = this.onConfirmPasswordInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.googleLogFailed = this.googleLogFailed.bind(this);
    this.googleLogSuccess = this.googleLogSuccess.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  onNameInput(event) {
    this.setState({ name: event.target.value });
    event.preventDefault();
  }

  onEmailInput(event) {
    this.setState({ email: event.target.value });
    event.preventDefault();
  }

  onPhoneInput(event) {
    this.setState({ phone: event.target.value });
    event.preventDefault();
  }

  onGenderSelect(event) {
    this.setState({ gender: event.target.value });
    event.preventDefault();
  }

  onPasswordInput(event) {
    this.setState({ password: event.target.value });
    event.preventDefault();
  }

  onConfirmPasswordInput(event) {
    this.setState({ confirmPassword: event.target.value });
    event.preventDefault();
  }

  onSubmit(event) {
    event.preventDefault();
    const phone = this.state.phone;
    if (
      !(
        phone.startsWith("013") ||
        phone.startsWith("014") ||
        phone.startsWith("015") ||
        phone.startsWith("016") ||
        phone.startsWith("017") ||
        phone.startsWith("018") ||
        phone.startsWith("019")
      )
    ) {
      alert("invalid phone number");
      return;
    }
    if (this.state.password.length < 6) {
      alert("password length should be at least 6");
      return;
    }
    if (this.state.password !== this.state.confirmPassword) {
      alert("passwords didn't matched");
      return;
    }

    const data = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      gender: this.state.gender,
      password: this.state.password,
      social: this.state.social
    };

    this.props.signup(data);
  }

  toggleModal() {
    this.setState({
      modal: !this.state.modal
    });
  }

  formView() {
    const loadingView = (
      <MDBBtn
        type="reset"
        size="sm"
        style={{ width: "98%", fontSize: 15 }}
        disabled
      >
        <div className="spinner-border spinner-border-sm" /> Signing up
      </MDBBtn>
    );

    const signupView = (
      <MDBBtn
        type="submit"
        onClick={this.onSubmit}
        size="sm"
        style={{ width: "98%", fontSize: 15 }}
      >
        Signup
      </MDBBtn>
    );

    return (
      <form onSubmit={this.onSubmit} method="POST">
        <MDBInput onChange={this.onNameInput} label="Name" outline size="md" />
        <MDBInput
          onChange={this.onEmailInput}
          label="Email"
          outline
          size="md"
          required
        />
        <MDBInput
          onChange={this.onPhoneInput}
          label="Phone (01XXXXXXXXX)"
          outline
          size="md"
          required
        />
        <div className="form-group">
          <select className="form-control" onChange={this.onGenderSelect}>
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="O">Other</option>
          </select>
        </div>
        <MDBInput
          onChange={this.onPasswordInput}
          minLength="6"
          type="password"
          label="Password (6 length)"
          outline
          size="md"
          required
        />
        <MDBInput
          onChange={this.onConfirmPasswordInput}
          type="password"
          label="Confrim Password"
          outline
          size="md"
          required
        />
        {this.props.isLoading ? loadingView : signupView}
      </form>
    );
  }

  googleLogSuccess(res) {
    this.toggleModal();
    this.setState({
      name: res.profileObj.name,
      email: res.profileObj.email,
      password: res.profileObj.googleId,
      confirmPassword: res.profileObj.googleId,
      social: true
    });
  }

  googleLogFailed(res) {
    console.log(res);
  }

  errorView() {
    return (
      <div className="alert alert-danger">
        <strong>{this.props.message}</strong>
      </div>
    );
  }

  verificationView() {
    return (
      <Layout>
        <Helmet>Email Verification</Helmet>
        <div className="mt-5" style={{ height: "100vh" }}>
          <h3 className="text-center">
            Verify Your Email. Check Your Mailbox.Also Check in Spam List
          </h3>
        </div>
      </Layout>
    );
  }

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/profile" />;
    }
    if (this.props.waitingForVerification) {
      return this.verificationView();
    }

    return (
      <Layout>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Signup</title>
          <link rel="stylesheet" href="../static/css/pages/index.css" />
        </Helmet>
        <div className="d-flex mt-5 mb-5 flex-column justify-content-center align-items-center">
          <h2 className="mt-5">SIGNUP with FREE</h2>
          <div className="col-md-5 list-group-item">
            {this.props.isFailed ? this.errorView() : <span></span>}
            {this.formView()}
            {aggrement}

            <div className="d-flex justify-content-center">
              <GoogleLogin
                clientId={GOOGLE_CLIENT_KEY}
                buttonText="SIGNUP WITH GOOGLE"
                onSuccess={this.googleLogSuccess}
                onFailure={this.googleLogFailed}
                cookiePolicy={"single_host_origin"}
              />
            </div>
            <p
              className="lead text-center mt-2"
              style={{ fontSize: 16, color: "#666" }}
            >
              Already have an account? <a href="/login">Log in</a>{" "}
            </p>
          </div>
        </div>
        <MDBModal isOpen={this.state.modal} toggle={this.toggleModal}>
          <MDBModalHeader toggle={this.toggleModal}>
            Complete Your Registration
          </MDBModalHeader>
          <MDBModalBody>
            {this.props.isFailed ? this.errorView() : <span></span>}
            <div className="form-group">
              <select className="form-control" onChange={this.onGenderSelect}>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
              </select>
            </div>
            <MDBInput
              onChange={this.onPhoneInput}
              label="Phone"
              outline
              size="md"
            />
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn
              type="submit"
              onClick={this.onSubmit}
              size="sm"
              style={{ width: "98%", fontSize: 15 }}
            >
              Signup
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </Layout>
    );
  }
}

const mapStateToLog = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading,
  isFailed: state.auth.isAuthenticationFailed,
  message: state.auth.message,
  waitingForVerification: state.auth.waitingForVerification
});

export default connect(mapStateToLog, { signup })(View);
