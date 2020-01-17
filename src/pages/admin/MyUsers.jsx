import React, { Component } from "react";
import { loadAllUsers } from "../../controller/actions/dashboard";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Loader } from "../../generic/widgets/misc";
import { Button, SpinnerButton } from "../../generic/widgets/button";
import style from "./styles/MyUsers.module.css";
import { Helmet } from "react-helmet";

const GENDER = {
  M: "Male",
  F: "Female",
  O: "Other",
  "*": "Not Specified"
};

const Profile = props => {
  return (
    <div>
      {props.data.bar}
      <br />
      {props.data.session} <br />
      {props.data.institute}
    </div>
  );
};

const UserRecord = props => {
  return (
    <tr className={style.userRecord}>
      <td>
        <a href="js:void()">{props.data.name}</a>
      </td>
      <td>{GENDER[props.data.gender]}</td>
      <td>{props.data.email}</td>
      <td>{props.data.phone}</td>
      <td>
        {props.data.profile ? (
          <Profile data={props.data.profile} />
        ) : (
          <span>NULL</span>
        )}
      </td>
    </tr>
  );
};

class View extends Component {
  static propTypes = {
    loadAllUsers: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isLoaded: PropTypes.bool.isRequired,
    isFailed: PropTypes.bool.isRequired,
    isUpdating: PropTypes.bool.isRequired,
    myUsers: PropTypes.array
  };

  constructor(props) {
    super(props);
    this.state = {
      nextPage: 1
    };
  }

  componentDidMount() {
    this.props.loadAllUsers(1);
  }

  componentWillUpdate(nextProps, nextStates) {
    if (this.props.isLoading || this.props.isUpdating) {
      if (nextProps.isLoaded) {
        this.setState({
          nextPage: this.state.nextPage + 1
        });
      }
    }
  }

  loadMore() {
    if (this.props.myUsers.length === 0) {
      return;
    }
    if (this.props.isUpdating) {
      return (
        <SpinnerButton smallSpin className="btn-primary disabled">
          Updating
        </SpinnerButton>
      );
    }
    return (
      <Button
        className="btn-primary"
        onClick={event => {
          console.log("requesting: " + this.state.nextPage);
          this.props.loadAllUsers(this.state.nextPage);
        }}
      >
        Load More
      </Button>
    );
  }

  view() {
    return (
      <div className="table-responsive">
        <table className="table">
          <tbody>
            {this.props.myUsers.map(item => (
              <UserRecord key={item.phone} data={item} />
            ))}
          </tbody>
        </table>
        {this.loadMore()}
      </div>
    );
  }

  render() {
    let renderView;
    if (this.props.isLoading) {
      renderView = <Loader />;
    } else if (this.props.isLoaded) {
      renderView = this.view();
    } else {
      renderView = <h4>Unable to load</h4>;
    }

    return (
      <div>
        <Helmet>
          <title>My Users</title>
        </Helmet>
        {renderView}
      </div>
    );
  }
}

const mapToloadIssue = state => ({
  isLoading: state.dashboard.isLoading,
  isLoaded: state.dashboard.isLoaded,
  isFailed: state.dashboard.isFailed,
  isUpdating: state.dashboard.isUpdating,
  myUsers: state.dashboard.myUsers
});

export default connect(
  mapToloadIssue,
  { loadAllUsers }
)(View);
