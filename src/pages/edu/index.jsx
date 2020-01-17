import React from "react";
import { Helmet } from "react-helmet";
import { Layout } from "../../generic/base";
import { ItemCard } from "../../generic/card";

class View extends React.Component {
  render() {
    return (
      <Layout>
        <Helmet>
          <title>Education | LawClinic</title>
        </Helmet>
        <div className="container">
          <div className="row d-flex justify-content-center align-items-stretch flex-wrap">
            <ItemCard name="Notes" url="edu/notes" icon="file" />
            <ItemCard
              name="Questions"
              url="edu/ques/mcq"
              icon="question-circle"
            />
            <ItemCard name="Exam" url="edu/exam" icon="file-signature" />
          </div>
        </div>
      </Layout>
    );
  }
}

export default View;
