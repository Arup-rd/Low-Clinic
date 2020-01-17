import React from "react";
import { withRouter } from "react-router-dom";
import { Layout } from "../../../generic/base";
import { Helmet } from "react-helmet";
import { MDBContainer, MDBRow } from "mdbreact";
import { MDBBtn } from "mdbreact";
import "./drafting.style.scss";

const Drafting = ({ history }) => (
  <div>
    <Layout className="layout">
      <Helmet>
        <title>Drafts</title>
      </Helmet>
      <MDBContainer className="drafting">
        <h2 className="title">Drafts</h2>
        <MDBRow className="draft-item ">
          <MDBBtn
            color="amber"
            className="rounded-circle"
            style={{ width: 200, height: 200, fontSize: 18 }}
            onClick={() => history.push("./cases")}
          >
            CSES
          </MDBBtn>
          <MDBBtn
            color="amber"
            className="rounded-circle"
            style={{ width: 200, height: 200, fontSize: 18 }}
          >
            LEGAL NOTICE
          </MDBBtn>
          <MDBBtn
            color="amber"
            className="rounded-circle"
            style={{ width: 200, height: 200, fontSize: 18 }}
          >
            AFFIDAVIT
          </MDBBtn>
          <MDBBtn
            color="amber"
            className="rounded-circle"
            style={{ width: 200, height: 200, fontSize: 18 }}
          >
            PARTNERSHIP DEED
          </MDBBtn>
          <MDBBtn
            color="amber"
            className="rounded-circle"
            style={{ width: 200, height: 200, fontSize: 18 }}
          >
            PARTNERSHIP DEED
          </MDBBtn>
        </MDBRow>
      </MDBContainer>
      <div className="pattern" />
    </Layout>
  </div>
);

export default withRouter(Drafting);
