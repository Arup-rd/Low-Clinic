import React from "react";
import { Layout } from "../../../generic/base";
import { Helmet } from "react-helmet";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import { Button, SpinnerButton } from "../../../generic/widgets/button";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  loadPublicMCQExams,
  createMCQExam
} from "../../../controller/actions/exam";
import { loadSubjects } from "../../../controller/actions/folder";

class PublicExams extends React.Component {
  static propTypes = {
    loadPublicMCQExams: PropTypes.func.isRequired,

    isLoading: PropTypes.bool.isRequired,
    isLoaded: PropTypes.bool.isRequired,
    isFailed: PropTypes.bool.isRequired,
    list: PropTypes.array.isRequired,
    listPageInfo: PropTypes.object,

    isListUpdaing: PropTypes.bool.isRequired,
    isListUpdateSuccess: PropTypes.bool.isRequired,
    isListUpdateFailed: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.loadPublicMCQExams();
  }

  getExamURL(item) {
    return "/edu/exam/mcq/view/" + item.node.uid;
  }

  getLoadButton() {
    if (!this.props.listPageInfo) {
      return;
    }
    if (!this.props.listPageInfo.hasNextPage) {
      return;
    }
    if (this.props.isListUpdaing) {
      return (
        <SpinnerButton smallSpin className="btn-sm btn-primary disabled">
          Loading
        </SpinnerButton>
      );
    }
    return (
      <Button
        className="btn-primary btn-sm"
        onClick={event => {
          this.props.loadPublicMCQExams(this.props.listPageInfo.endCursor);
        }}
      >
        More
      </Button>
    );
  }

  render() {
    if (!this.props.isAuthenticated) {
      return <Redirect to="/login" />;
    }
    let tableData;
    if (this.props.isLoaded === false) {
      tableData = (
        <tr>
          <td>
            <div className="spinner-border spinner-border-sm"></div>
          </td>
          <td>
            <div className="spinner-border spinner-border-sm"></div>
          </td>
          <td>
            <div className="spinner-border spinner-border-sm"></div>
          </td>
          <td>
            <div className="spinner-border spinner-border-sm"></div>
          </td>
        </tr>
      );
    } else {
      tableData = this.props.list.map(item => (
        <tr key={item.node.uid}>
          <td className="font-weight-bolder">
            <a href={this.getExamURL(item)}>{item.node.name}</a>
          </td>
          <td>{item.node.source.totalMcq}</td>
          <td>{item.node.createdBy.name}</td>
          <td>{new Date(item.node.dateTime).toLocaleString()}</td>
        </tr>
      ));
    }

    return (
      <div>
        <MDBTable>
          <MDBTableHead color="primary-color" textWhite>
            <tr>
              <th>Name</th>
              <th>Questions</th>
              <th>Owner</th>
              <th>Date</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>{tableData}</MDBTableBody>
        </MDBTable>
        <div className="flex-center">{this.getLoadButton()}</div>
      </div>
    );
  }
}

class View extends React.Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (!this.props.isAuthenticated) {
      return <Redirect to="/login" />;
    }

    return (
      <Layout>
        <Helmet>
          <title>MCQ Exam</title>
        </Helmet>
        <div className="container-fluid mt-4">
          <div className="flex-center">
            <div className="col-md-8">
              <h3>All Public Exam</h3>
              <PublicExams {...this.props} />
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

const mapStateToView = state => ({
  isLoading: state.exam.isLoading,
  isLoaded: state.exam.isLoaded,
  isFailed: state.exam.isLoaded,
  list: state.exam.list,
  listPageInfo: state.exam.listPageInfo,

  isListUpdaing: state.exam.isListUpdaing,
  isListUpdateSuccess: state.exam.isListUpdateSuccess,
  isListUpdateFailed: state.exam.isListUpdateFailed,

  subjectList: state.folder.data,

  isCreating: state.exam.isCreating,
  isCreated: state.exam.isCreated,
  isCreationFailed: state.exam.isCreationFailed,
  data: state.exam.data,

  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(
  mapStateToView,
  { loadPublicMCQExams, createMCQExam, loadSubjects }
)(View);
