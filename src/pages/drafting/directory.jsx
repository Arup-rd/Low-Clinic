import React from "react";
import { Helmet } from "react-helmet";
import { Layout } from "../../generic/base";
import { Loader } from "../../generic/widgets/misc";
import PropTypes from "prop-types";
import { exploreDirectory } from "../../controller/actions/drafting";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import FolderSetView from "./components/directorySet";
import ArticleSetView from "./components/articleSet";

class View extends React.Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    user: PropTypes.object,

    exploreDirectory: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    isLoaded: PropTypes.bool,
    directories: PropTypes.array.isRequired,
    rootDirectory: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      isValidCall: true
    };
  }

  componentDidMount() {
    const params = new URLSearchParams(this.props.location.search);
    if (!params.get("location")) {
      this.setState({
        isValidCall: false
      });
    } else {
      this.props.exploreDirectory(params.get("location"));
      this.setState({
        location: params.get("location")
      });
    }
  }

  folderListView() {
    return (
      <div className="container-fluid">
        <div className="row flex-center">
          <div className="col-md-8">
            <FolderSetView
              directoryList={this.props.directories}
              rootDirectory={this.props.rootDirectory}
            />
          </div>
        </div>
      </div>
    );
  }

  postListView() {
    return (
      <div className="container-fluid">
        <div className="row flex-center">
          <div className="col-md-8">
            <ArticleSetView
              articleList={this.props.rootDirectory.articleSet}
              rootDirectory={this.props.rootDirectory}
            />
          </div>
        </div>
      </div>
    );
  }

  view() {
    return (
      <div>
        {this.folderListView()}
        <br />
        <br />
        {this.postListView()}
      </div>
    );
  }

  invalidView() {
    return (
      <div className="mt-4">
        <h4 className="text-center">Invalid Call</h4>
      </div>
    );
  }

  validView() {
    if (this.props.isLoaded && this.props.user) {
      return this.view();
    }
    return (
      <div className="mt-4">
        <Loader />
      </div>
    );
  }

  renderView() {
    if (this.state.isValidCall) {
      return this.validView();
    } else {
      return this.invalidView();
    }
  }

  render() {
    if (!this.props.isAuthenticated) {
      return <Redirect to="/login" />;
    }

    return (
      <Layout>
        <Helmet>
          <title>Directory</title>
        </Helmet>
        <div className="mt-5 mb-4" style={{ minHeight: "80vh" }}>
          <div className="">{this.renderView()}</div>
        </div>
      </Layout>
    );
  }
}

const mapToStateFolder = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,

  isLoading: state.drafting.isLoading,
  isLoaded: state.drafting.isLoaded,
  directories: state.drafting.data,

  rootDirectory: state.drafting.rootDirectory
});

export default connect(
  mapToStateFolder,
  { exploreDirectory }
)(View);
