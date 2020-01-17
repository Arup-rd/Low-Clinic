import React from "react";
import { connect } from "react-redux";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBContainer
} from "mdbreact";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import PropTypes from "prop-types";
import Logo from "../static/img/logo final .png";

class Navbar extends React.Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    user: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      isWidthEnough: false
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    this.setState({
      collapse: !this.state.collapse
    });
  }

  adminPanel() {
    if (this.props.user) {
      if (this.props.user.account.isStaff) {
        return (
          <MDBNavItem>
            <MDBNavLink to="/dashboard/?tab=overview">Dashboard</MDBNavLink>
          </MDBNavItem>
        );
      }
    }
    return;
  }

  render() {
    const isAuthenticated = this.props.isAuthenticated && this.props.user;

    const authLinks = (
      <MDBNavbarNav right>
        <MDBNavItem>
          <MDBNavLink to="/profile">Profile</MDBNavLink>
        </MDBNavItem>
        <MDBNavItem>
          <MDBNavLink to="/logout">Logout</MDBNavLink>
        </MDBNavItem>
      </MDBNavbarNav>
    );

    const guestLinks = (
      <MDBNavbarNav right>
        <MDBNavItem>
          <MDBNavLink to="/login">Login</MDBNavLink>
        </MDBNavItem>
        <MDBNavItem>
          <MDBNavLink to="/signup">Signup</MDBNavLink>
        </MDBNavItem>
      </MDBNavbarNav>
    );

    return (
      <MDBNavbar
        color="white"
        light
        expand="md"
        fixed="top"
        className="z-depth-0"
        scrolling
      >
        <MDBContainer>
          <MDBNavbarBrand href="/">
            <strong>
              <img src={Logo} alt="logo" width="100px" height="auto" />
              {/* Ask Riashad */}
            </strong>
          </MDBNavbarBrand>
          {!this.state.isWidthEnough && (
            <MDBNavbarToggler onClick={this.onClick} />
          )}
          <MDBCollapse isOpen={this.state.collapse} navbar>
            <MDBNavbarNav left>
              <MDBNavItem>
                <MDBNavLink to="/edu/notes">Notes</MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink to="/edu/exam/mcq/types/">
                  Exam Preparation
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink to="/drafting">Drafting</MDBNavLink>
              </MDBNavItem>
              {this.adminPanel()}
            </MDBNavbarNav>

            {isAuthenticated ? authLinks : guestLinks}
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapStateToProps)(Navbar);
