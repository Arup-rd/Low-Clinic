import React from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Layout } from "../../generic/base";
import { loadArticle } from "../../controller/actions/article";
import { Redirect } from "react-router-dom";

class View extends React.Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    loadArticle: PropTypes.func.isRequired,
    articleObject: PropTypes.object,
    isLoading: PropTypes.bool,
    isLoaded: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.state = {
      isValidCall: true
    };
  }

  componentDidMount() {
    const params = new URLSearchParams(this.props.location.search);
    if (params.get("uid")) {
      this.props.loadArticle(params.get("uid"));
    } else {
      this.setState({
        isValidCall: false
      });
    }
  }

  getDate(date) {
    return new Date(date).toLocaleString();
  }

  view() {
    return (
      <div>
        <h4>{this.props.articleObject.title}</h4>
        <p className="blockquote-footer text-left lead">
          {this.getDate(this.props.articleObject.dateTime)}
        </p>
        <br />
        <p className="lead" style={{ whiteSpace: "pre-line" }}>
          {this.props.articleObject.body}
        </p>
      </div>
    );
  }

  render() {
    if (!this.props.isAuthenticated) {
      return <Redirect to="/login" />;
    }

    const validView = this.props.isLoaded ? (
      this.view()
    ) : (
      <div className="d-flex justify-content-center">
        <div className="spinner-border"></div>
      </div>
    );

    const invalidView = <h1 className="display-4">Invalid Call</h1>;

    return (
      <Layout>
        <Helmet>
          <title>Article</title>
        </Helmet>
        <div className="d-flex justify-content-center mt-5">
          <div className="col-md-8">
            {this.state.isValidCall ? validView : invalidView}
          </div>
        </div>
      </Layout>
    );
  }
}

const mapToLoadPost = state => ({
  isAuthenticated: state.auth.isAuthenticated,

  isLoading: state.article.isLoading,
  isLoaded: state.article.isLoaded,
  articleObject: state.article.articleObject
});

export default connect(
  mapToLoadPost,
  { loadArticle }
)(View);
