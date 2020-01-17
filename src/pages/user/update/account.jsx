import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateAccount } from "../../../controller/actions/auth";
import { Redirect } from "react-router-dom";

class View extends React.Component {
  static propTypes = {
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
      user: this.props.user,
      loaded: false,
      password: "",
      gender: "M"
    };

    this.handleName = this.handleName.bind(this);
    this.handlePhone = this.handlePhone.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleGender = this.handleGender.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(props) {
    if (!this.state.loaded) {
      if (props.user) {
        this.setState({
          name: props.user.account.name,
          email: props.user.account.email,
          phone: props.user.account.phone,
          loaded: true
        });
      }
    }
  }

  handlePhone(event) {
    this.setState({
      phone: event.target.value
    });
  }

  handleEmail(event) {
    this.setState({
      email: event.target.value
    });
  }

  handleName(event) {
    this.setState({
      name: event.target.value
    });
  }

  handleGender(event) {
    this.setState({
      gender: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const obj = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      gender: this.state.gender
    };
    this.props.updateAccount(obj);
  }

  formView() {
    return (
      <form method="POST" onSubmit={this.handleSubmit}>
        <label htmlFor="name" className="mb-0 d-block">
          Name
        </label>
        <input
          placeholder="Mr. Example"
          className="form-control mb-2"
          type="text"
          id="name"
          required
          value={this.state.name}
          onChange={this.handleName}
        />
        <label htmlFor="email" className="mb-0 d-block">
          Email
        </label>
        <input
          placeholder="example@mail.com"
          className="form-control mb-2"
          type="email"
          id="email"
          required
          value={this.state.email}
          onChange={this.handleEmail}
        />
        <label htmlFor="phone" className="mb-0 d-block">
          Phone
        </label>
        <input
          maxLength="11"
          minLength="11"
          placeholder="01XXXXXXXXX"
          required
          className="form-control mb-2"
          type="text"
          id="phone"
          value={this.state.phone}
          onChange={this.handlePhone}
        />
        <label htmlFor="geder" className="mb-0">
          Gender
        </label>
        <select
          id="gender"
          onChange={this.handleGender}
          className="form-control mb-2"
        >
          <option value="M">Male</option>
          <option value="F">Female</option>
          <option value="O">Other</option>
          <option value="*">Not to say</option>
        </select>
        {!this.props.isLoading ? (
          <button
            className="btn btn-primary mt-3"
            type="submit"
            onSubmit={this.handleSubmit}
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
      <div className="container-fluid mt-5">
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
  { updateAccount }
)(View);
