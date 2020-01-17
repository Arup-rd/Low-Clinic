import React, { Component } from "react";
import { MDBContainer, MDBIcon } from "mdbreact";
import { Layout } from "../../generic/base";

const CareerCard = props => {
  return (
    <div
      className="flex-shrink-0 d-flex flex-column justify-content-center align-content-center m-3"
      style={{
        height: 200,
        width: 200,
        background: "#f4ac59aa"
      }}
    >
      <MDBIcon
        className="mt-3"
        style={{ fontSize: "100px" }}
        icon={props.icon}
      ></MDBIcon>
      <p className="m-3" style={{ fontSize: "20px" }}>
        {props.children}
      </p>
    </div>
  );
};

class Career extends Component {
  state = {};
  render() {
    return (
      <Layout>
        <MDBContainer fluid className="career mb-5 p-5">
          <h3 className="text-center font-weight-bolder text-dark pb-4">
            Browse our career
          </h3>
          <div className="d-flex justify-content-center text-center align-content-center flex-wrap">
            <CareerCard icon="gavel">Lawyer</CareerCard>
            <CareerCard icon="mobile-alt">Developer</CareerCard>
            <CareerCard icon="user-alt">HRM</CareerCard>
            <CareerCard icon="briefcase">Manager</CareerCard>
          </div>
        </MDBContainer>
      </Layout>
    );
  }
}

export default Career;
