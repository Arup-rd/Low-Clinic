import React from "react";
import { Layout } from "../../../generic/base";
import { Helmet } from "react-helmet";
import {
  MDBTabPane,
  MDBTabContent,
  MDBNav,
  MDBNavItem,
  MDBNavLink
} from "mdbreact";
import { default as AccountUpdate } from "./account";
import { default as PasswordUpdate } from "./password";
import { default as ProfileUpdate } from "./profile";

class View extends React.Component {
  state = {
    activeItem: "1"
  };

  toggle = tab => e => {
    if (this.state.activeItem !== tab) {
      this.setState({
        activeItem: tab
      });
    }
  };
  render() {
    return (
      <Layout>
        <Helmet>Update Profile</Helmet>

        <div className="container-fluid">
          <div className="row flex-center">
            <div className="col-md-6">
              <MDBNav className="nav-tabs mt-5">
                <MDBNavItem>
                  <MDBNavLink
                    to="#"
                    active={this.state.activeItem === "1"}
                    onClick={this.toggle("1")}
                    role="tab"
                  >
                    Account
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink
                    to="#"
                    active={this.state.activeItem === "2"}
                    onClick={this.toggle("2")}
                    role="tab"
                  >
                    Profile
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink
                    to="#"
                    active={this.state.activeItem === "3"}
                    onClick={this.toggle("3")}
                    role="tab"
                  >
                    Password
                  </MDBNavLink>
                </MDBNavItem>
              </MDBNav>
              <MDBTabContent activeItem={this.state.activeItem}>
                <MDBTabPane tabId="1" role="tabpanel">
                  <AccountUpdate />
                </MDBTabPane>
                <MDBTabPane tabId="2" role="tabpanel">
                  <ProfileUpdate />
                </MDBTabPane>
                <MDBTabPane tabId="3" role="tabpanel">
                  <PasswordUpdate />
                </MDBTabPane>
              </MDBTabContent>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default View;
