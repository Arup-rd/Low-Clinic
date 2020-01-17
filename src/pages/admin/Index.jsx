import React from "react";
import { Layout } from "../../generic/base";
import { default as Overview } from "./Overview";
import { default as MyUsers } from "./MyUsers";
// import { default as Drafts } from "./Drafts";
import { default as Issues } from "./Issues";
import { default as SupportBox } from "./SupportBox";
import { default as ErrorView } from "../error";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Loader } from "../../generic/widgets/misc";

class View extends React.Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    user: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = { visible: false, tab: "" };
  }

  componentDidMount() {
    const params = new URLSearchParams(this.props.location.search);
    if (params.get("tab")) {
      this.setState({
        tab: params.get("tab", "overview")
      });
    }
  }

  listView() {
    return (
      <ul className="list-group position-sticky">
        <li className="list-group-item bg-warning ">
          <a
            className="text-white font-weight-bold"
            href="/dashboard?tab=overview"
          >
            Overview
          </a>
        </li>
        <li className="list-group-item bg-warning ">
          <a
            className="text-white font-weight-bold"
            href="/dashboard?tab=myusers"
          >
            My Users
          </a>
        </li>
        {/* <li className="list-group-item bg-warning ">
          <a
            className="text-white font-weight-bold"
            href="/dashboard?tab=drafts"
          >
            Drafts
          </a>
        </li> */}
        <li className="list-group-item bg-warning ">
          <a
            className="text-white font-weight-bold"
            href="/dashboard?tab=issues"
          >
            Issues
          </a>
        </li>
        <li className="list-group-item bg-warning ">
          <a
            className="text-white font-weight-bold"
            href="/dashboard?tab=supportbox"
          >
            Support Box
          </a>
        </li>
      </ul>
    );
  }

  currentView() {
    if (this.state.tab === "overview") {
      return <Overview />;
    }
    if (this.state.tab === "myusers") {
      return <MyUsers />;
    }
    // if (this.state.tab === "drafts") {
    //   return <Drafts />;
    // }
    if (this.state.tab === "supportbox") {
      return <SupportBox />;
    }
    if (this.state.tab === "issues") {
      return <Issues />;
    }
    return (
      <div className="mt-3">
        <h4 className="text-center">No View Found</h4>
      </div>
    );
  }

  render() {
    if (!this.props.isAuthenticated) {
      return <ErrorView />;
    }
    if (!this.props.user) {
      return (
        <Layout>
          <Loader />
        </Layout>
      );
    }
    if (!this.props.user.account.isStaff) {
      return <ErrorView />;
    }
    return (
      <Layout>
        <div className="container-fluid mt-3">
          <div className="row">
            <div className="col-md-2">{this.listView()}</div>
            <div className="col-md-10">{this.currentView()}</div>
          </div>
        </div>
      </Layout>
    );
  }
}

const mapToDashboardState = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapToDashboardState)(View);
