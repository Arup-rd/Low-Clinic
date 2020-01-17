import React, { Component } from "react";
import { Layout } from "../generic/base";
import { Helmet } from "react-helmet";
import { HomeCard } from "../generic/card";
import { TopQuote, BotQuote } from "../generic/index/quote";
import "../static/css/pages/index.css";
import Description from "../generic/index/description";
import { MDBContainer, MDBRow } from "mdbreact";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Layout>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Ask Riashad</title>
          <link rel="stylesheet" href="../static/css/pages/index.css" />
        </Helmet>
        <TopQuote />
        <MDBContainer>
          <MDBRow className="pb-5">
            <div
              className="d-flex flex-column flex-md-row align-items-stretch justify-content-center"
              style={{ width: "100%" }}
            >
              <HomeCard
                name="Bar council MCQ preparation"
                url="edu/exam/mcq/types/"
                icon="file-signature"
                className="col-md-3"
              >
                ফ্রি মডেল টেস্ট সফটওয়্যার
              </HomeCard>
              <HomeCard
                name="Subject Wise Notes"
                url="edu/notes"
                icon="book-reader"
                className="col-md-3"
              >
                ফ্রি নোট
              </HomeCard>
              <HomeCard
                name="Free Draft Collection"
                url="drafting/"
                icon="pen-nib"
                className="col-md-3"
              >
                ফ্রি ড্রাফট কালেঙ্কশন
              </HomeCard>
            </div>
          </MDBRow>
          <BotQuote />
          <Description />
          {/* <CardCarousel team={this.state.team} className="mb-5" /> */}
        </MDBContainer>
        <div className="pattern" />
      </Layout>
    );
  }
}

export default Index;
