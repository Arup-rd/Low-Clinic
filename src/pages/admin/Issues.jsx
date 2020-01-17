import React from "react";
import { connect } from "react-redux";
import { loadAllIssues } from "../../controller/actions/dashboard";
import PropTypes from "prop-types";
import { Loader } from "../../generic/widgets/misc";
import { Button } from "../../generic/widgets/button";
import { Helmet } from "react-helmet";
import { MDBModal, MDBModalBody } from "mdbreact";
import axios from "axios";
import { SERVER } from "../../controller/actions/config";

class IssueItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisibility: false
    };
  }

  toggle = () => () => {
    this.setState({
      modalVisibility: !this.state.modalVisibility
    });
  };

  handleSolve = () => () => {
    const config = {
      headers: {
        Authorization: `Token ${this.props.access}`
      }
    };
    this.setState({
      modalVisibility: false
    });
    axios
      .put(`${SERVER}/api/blog/mcq-issue/${this.props.data.uid}/`, {}, config)
      .then(res => {
        alert("Issue Solved");
      })
      .catch(err => {
        alert("Something went wrong");
      });
  };

  modalView() {
    return (
      <MDBModal isOpen={this.state.modalVisibility} toggle={this.toggle()}>
        <MDBModalBody>
          <article className="font-weight-bold">{this.props.data.body}</article>
          {this.props.data.isSolved ? (
            <span></span>
          ) : (
            <div>
              <br />
              <Button className="btn-sm btn-green" onClick={this.handleSolve()}>
                Solve
              </Button>
            </div>
          )}
        </MDBModalBody>
      </MDBModal>
    );
  }

  render() {
    return (
      <tr>
        <td>
          <a href={`/dashboard/mcq/${this.props.data.mcq.uid}`}>
            {"MCQ: "}
            {this.props.data.mcq.uid}
          </a>
        </td>
        <td>{this.props.data.user.name}</td>
        <td>{new Date(this.props.data.dateTime).toLocaleDateString()}</td>
        <td>{this.props.data.isSolved ? "Solved" : "Pending"}</td>
        <td>
          <Button className="btn-sm btn-dark" onClick={this.toggle()}>
            View
          </Button>
          {this.modalView()}
        </td>
      </tr>
    );
  }
}

class View extends React.Component {
  static propTypes = {
    accessToken: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isLoaded: PropTypes.bool.isRequired,
    isFailed: PropTypes.bool.isRequired,
    issueList: PropTypes.array,
    loadAllIssues: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.loadAllIssues();
  }

  view() {
    return (
      <div className="table-responsive">
        <table className="table">
          <tbody>
            {this.props.issueList.map(item => (
              <IssueItem
                key={item.node.uid}
                data={item.node}
                access={this.props.accessToken}
              />
            ))}
          </tbody>
        </table>
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
          <title>Issue List</title>
        </Helmet>
        {renderView}
      </div>
    );
  }
}

const mapToIssueStates = state => ({
  accessToken: state.auth.access,
  isLoading: state.dashboard.isLoading,
  isLoaded: state.dashboard.isLoaded,
  isFailed: state.dashboard.isLoaded,
  issueList: state.dashboard.issueList
});

export default connect(
  mapToIssueStates,
  { loadAllIssues }
)(View);
