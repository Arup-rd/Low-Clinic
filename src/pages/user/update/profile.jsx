import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateProfile } from "../../../controller/actions/auth";
import { Redirect } from "react-router-dom";

class View extends React.Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    user: PropTypes.object,
    updateProfile: PropTypes.func.isRequired,

    isLoading: PropTypes.bool.isRequired,
    isSuccess: PropTypes.bool.isRequired,
    isFailed: PropTypes.bool.isRequired,
    message: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      institutionName: "",
      barName: "",
      session: "",
      loaded: false
    };
    this.handleInstitutionNameInput = this.handleInstitutionNameInput.bind(
      this
    );
    this.handleBarNameInput = this.handleBarNameInput.bind(this);
    this.handleSessionInput = this.handleSessionInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInstitutionNameInput(event) {
    this.setState({
      institutionName: event.target.value
    });
  }

  handleBarNameInput(event) {
    this.setState({
      barName: event.target.value
    });
  }

  handleSessionInput(event) {
    this.setState({ session: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.institutionName === "" || this.state.barName === "") {
      return;
    }

    if (isNaN(parseInt(this.state.session))) {
      return;
    }

    const obj = {
      institute: this.state.institutionName,
      bar: this.state.barName,
      session: this.state.session,
      account: this.props.user.account.id
    };

    this.props.updateProfile(obj);
  }

  componentWillReceiveProps(props) {
    if (!this.state.loaded) {
      if (props.user) {
        this.setState({
          institutionName: props.user.account.profile.institute,
          barName: props.user.account.profile.bar,
          session: props.user.account.profile.session,
          loaded: true
        });
      }
    }
  }

  formView() {
    return (
      <form method="POST" onSubmit={this.handleSubmit}>
        <label className="mb-0 mt-1">Institution Name</label>
        <input
          type="text"
          className="form-control"
          onChange={this.handleInstitutionNameInput}
          required
          value={this.state.institutionName}
        />
        <label className="mb-0 mt-2">Bar Association</label>
        <input
          type="text"
          className="form-control"
          onChange={this.handleBarNameInput}
          required
          value={this.state.barName}
        />
        <label className="mb-0 mt-2">Session</label>
        <input
          type="text"
          className="form-control"
          onChange={this.handleSessionInput}
          required
          value={this.state.session}
        />
        {!this.props.isLoading ? (
          <button
            type="submit"
            onSubmit={this.handleSubmit}
            className="btn btn-primary mt-3"
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
  { updateProfile }
)(View);
