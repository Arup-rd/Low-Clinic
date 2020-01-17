import React from "react";
import PropTypes from "prop-types";
import { updatePassword } from "../../../controller/actions/auth";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class View extends React.Component {
  static propTypes = {
    updatePassword: PropTypes.func.isRequired,

    isAuthenticated: PropTypes.bool.isRequired,
    user: PropTypes.object,
    updateAccount: PropTypes.func.isRequired,

    isLoading: PropTypes.bool.isRequired,
    isSuccess: PropTypes.bool.isRequired,
    isFailed: PropTypes.bool.isRequired,
    message: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    };

    this.handleCurrentPassword = this.handleCurrentPassword.bind(this);
    this.handleNewPassword = this.handleNewPassword.bind(this);
    this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCurrentPassword(event) {
    this.setState({
      currentPassword: event.target.value
    });
  }

  handleNewPassword(event) {
    this.setState({
      newPassword: event.target.value
    });
  }

  handleConfirmPassword(event) {
    this.setState({
      confirmPassword: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const obj = {
      password: this.state.currentPassword,
      new_password: this.state.newPassword,
      confirm_password: this.state.confirmPassword
    };
    this.props.updatePassword(obj);
  }

  formView() {
    return (
      <form method="POST" onSubmit={this.handleSubmit}>
        <label htmlFor="pass1" className="mb-0">
          Current Password
        </label>
        <input
          type="password"
          id="pass1"
          className="form-control mb-2"
          onChange={this.handleCurrentPassword}
          required
        />

        <label htmlFor="pass2" className="mb-0">
          New Password
        </label>
        <input
          type="password"
          id="pass2"
          className="form-control mb-2"
          onChange={this.handleNewPassword}
          required
        />

        <label htmlFor="pass3" className="mb-0">
          Confirm Password
        </label>
        <input
          type="password"
          id="pass3"
          className="form-control mb-2"
          onChange={this.handleConfirmPassword}
          required
        />
        {!this.props.isLoading ? (
          <button
            type="submit"
            onSubmit={this.handleSubmit}
            className="btn btn-primary"
          >
            Update
          </button>
        ) : (
          <button className="btn btn-primary mt-3 disabled" type="submit">
            <div className="spinner-border spinner-border-sm"></div>
            Updating
          </button>
        )}
      </form>
    );
  }

  render() {
    if (this.props.isSuccess) {
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
      <div className="container-fluid">
        <div className="row flex-center">
          <div className="col-md-12 list-group-item">
            {this.props.isFailed ? errorView : <span></span>}
            {this.formView()}
          </div>
        </div>
      </div>
    );
  }
}

const mapToStateView = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  isLoading: state.auth.updateRequest,
  isFailed: state.auth.updateFailed,
  isSuccess: state.auth.updateSuccess,
  message: state.auth.message
});

export default connect(
  mapToStateView,
  { updatePassword }
)(View);
