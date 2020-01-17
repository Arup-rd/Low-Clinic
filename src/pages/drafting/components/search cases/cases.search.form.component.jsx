import React from "react";
import { Layout } from "../../../../generic/base";
import { Helmet } from "react-helmet";
import "./cases.search.style.scss";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon } from "mdbreact";

const SearchCases = () => {
  return (
    <Layout className="layout">
      <MDBContainer className="Seach-Cases">
        <MDBRow className="items">
          <MDBCol md="6">
            <form>
              <p className="h4 text-center mb-4">Search Cases</p>
              <label htmlFor="defaultFormContactNameEx" className="grey-text">
                What Are You Looking For!
              </label>
              <input
                type="text"
                id="defaultFormContactNameEx"
                className="form-control"
              />
              <br />
              <label htmlFor="defaultFormContactEmailEx" className="grey-text">
                Select Relevent Act
              </label>
              <input
                type="email"
                id="defaultFormContactEmailEx"
                className="form-control"
              />
              <br />
              <label
                htmlFor="defaultFormContactSubjectEx"
                className="grey-text"
              >
                Select Relevent Sections
              </label>
              <input
                type="text"
                id="defaultFormContactSubjectEx"
                className="form-control"
              />
              <br />
              <div className="text-center mt-4">
                <MDBBtn color="warning" outline type="submit">
                  Search
                  <MDBIcon far icon="fas fa-search" className="ml-2" />
                </MDBBtn>
              </div>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </Layout>
  );
};

export default SearchCases;
