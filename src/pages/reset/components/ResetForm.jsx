import React from "react";
import { connect } from "react-redux";
import { TextInput } from "../../../generic/widgets/forms";
import { Button, SpinnerButton } from "../../../generic/widgets/button";
import { passwordReset } from "../../../controller/actions/reset";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

class View extends React.Component {
  static propTypes = {
    isPasswordResetloading: PropTypes.bool.isRequired,
    isPasswordResetRequestSuccess: PropTypes.bool.isRequired,
    isPasswordResetRequestFailed: PropTypes.bool.isRequired,
    passwordReset: PropTypes.func.isRequired,

    isAuthenticatied: PropTypes.bool.isRequired,
    user: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      newPassword: null,
      confirmPassword: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.newPassword !== this.state.confirmPassword) {
      alert("new and confirm password didn't matched");
      return;
    }

    if (this.state.newPassword.length < 6) {
      alert("password must be at least 6 length");
      return;
    }

    if (this.state.newPassword.length > 60) {
      alert("password must at most 60 length");
      return;
    }

    let data = {
      new_password: this.state.newPassword,
      confirm_password: this.state.confirmPassword
    };
    this.props.passwordReset(data);
  }

  formView() {
    return (
      <form method="POST" onSubmit={this.handleSubmit}>
        <TextInput
          type="password"
          label="New Password"
          isRequired="true"
          onChange={event => {
            this.setState({ newPassword: event.target.value });
          }}
        />
        <TextInput
          type="password"
          label="Confirm Password"
          isRequired="true"
          onChange={event => {
            this.setState({ confirmPassword: event.target.value });
          }}
        />
        <div className="flex-center">
          {this.props.isPasswordResetloading ? (
            <SpinnerButton smallSpin className="disabled">
              Requesting
            </SpinnerButton>
          ) : (
            <Button
              type="submit"
              className="btn-green"
              onSubmit={this.handleSubmit}
            >
              Reset Password
            </Button>
          )}
        </div>
      </form>
    );
  }

  render() {
    if (this.props.isPasswordResetRequestSuccess) {
      return <Redirect to="/login" />;
    }
    return <div className="list-group-item">{this.formView()}</div>;
  }
}

const mapToPropStates = state => ({
  isPasswordResetloading: state.reset.isPasswordResetloading,
  isPasswordResetRequestSuccess: state.reset.isPasswordResetloading,
  isPasswordResetRequestFailed: state.reset.isPasswordResetloading
});

export default connect(mapToPropStates, { passwordReset })(View);
