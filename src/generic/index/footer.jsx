import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBIcon } from "mdbreact";

class Footer extends Component {
  render() {
    return (
      <MDBContainer
        fluid
        className="bg-dark text-light p-5 mt-5 text-center text-lg-left"
      >
        <MDBRow className="flex-center">
          <MDBCol lg="3" className="px-4 mb-4 mb-lg-0">
            <h3>Upcoming Services</h3>
            <p>Income Tax</p>
            <p>Law Support</p>
          </MDBCol>
          <MDBCol lg="3" className="px-4 mb-4 mb-lg-0">
            <h3>Site</h3>
            <p>
              <a href="/privacy-policy">Privacy Policy</a>
            </p>
            <p>
              <a href="/terms">Terms and Conditions</a>
            </p>
            <p>
              <a href="/career">Career</a>
            </p>
            <p>
              <a href="/contact">Contact</a>
            </p>
          </MDBCol>
          <MDBCol lg="3" className="px-4 mb-4 mb-lg-0">
            <h3>Stay With Us</h3>
            <h3 className="d-inline">
              <MDBIcon className="m-2" fab icon="facebook-square" />
            </h3>
            <h3 className="d-inline">
              <MDBIcon className="m-2" fab icon="twitter-square" />
            </h3>
            <h3 className="d-inline">
              <MDBIcon className="m-2" fab icon="google-plus-square" />
            </h3>
            <h3 className="d-inline">
              <MDBIcon className="m-2" fab icon="linkedin" />
            </h3>
            <h3 className="d-inline">
              <MDBIcon className="m-2" fab icon="whatsapp-square" />
            </h3>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default Footer;
