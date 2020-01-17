import React from "react";
import { Redirect } from "react-router-dom";
import { logout } from "../../controller/actions/auth";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class View extends React.Component {
  static propTypes = {
    logout: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  };

  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.logout();
    }
  }

  render() {
    if (!this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    if (this.props.isAuthenticated) {
      return (
        <div className="d-flex justify-content-center mt-5">
          <div className="spinner-border spinner-border-lg"></div> Logging out
        </div>
      );
    }
  }
}

const mapToLogout = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapToLogout,
  { logout }
)(View);
