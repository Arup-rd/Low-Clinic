import React from "react";
import { Layout } from "../../../generic/base";
import { Helmet } from "react-helmet";
import { loadSubjects } from "../../../controller/actions/folder";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createMCQExam } from "../../../controller/actions/exam";
import { MDBBtn, MDBModal, MDBModalHeader, MDBModalBody } from "mdbreact";
import { Redirect } from "react-router-dom";

class View extends React.Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isLoaded: PropTypes.bool.isRequired,
    isFailed: PropTypes.bool.isRequired,
    subjects: PropTypes.array,

    isCreating: PropTypes.bool.isRequired,
    isCreated: PropTypes.bool.isRequired,
    isCreationFailed: PropTypes.bool.isRequired,

    isAuthenticated: PropTypes.bool.isRequired,
    user: PropTypes.object,

    loadSubjects: PropTypes.func.isRequired,
    createMCQExam: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      visibility: false,
      name: "Subject Wise Exam",
      public: false,
      duration: 15,
      totalMcq: 25,
      selectedSubjects: []
    };

    this.onNameInput = this.onNameInput.bind(this);
    this.onCombinationChange = this.onCombinationChange.bind(this);
    this.onPublicCheck = this.onPublicCheck.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.loadSubjects();
  }

  onNameInput(event) {
    this.setState({
      name: event.target.value
    });
  }

  onPublicCheck(event) {
    this.setState({
      public: event.target.checked
    });
  }

  onCombinationChange(event) {
    if (event.target.value === "3") {
      this.setState({ duration: 60, totalMcq: 100 });
    } else if (event.target.value === "2") {
      this.setState({ duration: 30, totalMcq: 50 });
    } else {
      this.setState({ duration: 15, totalMcq: 25 });
    }
  }

  loadingView() {
    return (
      <div
        style={{ marginTop: 100, minHeight: "75vh" }}
        className="flex-center"
      >
        <div className="spinner spinner-border"></div>
      </div>
    );
  }

  handleSelect = node => () => {
    this.toggle();

    this.setState({
      selectedSubjects: [{ label: node.name, value: node.selfLoc.uid }]
    });
  };

  handleSubmit(event) {
    event.preventDefault();
    const obj = {
      name: this.state.name,
      public: this.state.public,
      created_by: this.props.user.account.id,
      duration: this.state.duration,
      total_mcq: this.state.totalMcq
    };
    this.props.createMCQExam(obj, this.state.selectedSubjects);
  }

  formViewFull() {
    let formButton;
    if (this.props.isCreating) {
      formButton = (
        <button className="btn btn-green btn-sm disabled">
          Creating
          <div className="spinner-border spinner-border-sm d-inline-block"></div>
        </button>
      );
    } else if (!this.props.isCreating && !this.props.isCreated) {
      formButton = (
        <button
          className="btn btn-green btn-sm"
          onSubmit={this.handleFullSubmit}
          type="submit"
        >
          Create
        </button>
      );
    }

    return (
      <form method="POST" onSubmit={this.handleSubmit}>
        <label className="mb-0">Set your exam name (*optional):</label>
        <input
          onChange={this.onNameInput}
          placeholder="Name"
          type="text"
          className="form-control mb-3"
        />
        <div>
          <label className="mb-0">Exam combination</label>
          <select
            className="form-control mb-3"
            onChange={this.onCombinationChange}
          >
            <option value="1">25 MCQ : 15 Min</option>
            <option value="2">50 MCQ : 30 Min</option>
            <option value="3">100 MCQ : 60 Min</option>
          </select>
        </div>

        <div className="custom-control custom-checkbox">
          <input
            onChange={this.onPublicCheck}
            type="checkbox"
            id="check-public"
            className="custom-control-input"
          />
          <label htmlFor="check-public" className="custom-control-label">
            Public
          </label>
        </div>

        <div className="flex-center">{formButton}</div>
      </form>
    );
  }

  toggle = () => {
    this.setState({
      visibility: !this.state.visibility
    });
  };

  subjectsView() {
    return (
      <div className="my-5" style={{ minHeight: "100vh" }}>
        <div className="container d-flex flex-wrap justify-content-center">
          {this.props.subjects.map(item => (
            <div>
              <MDBBtn
                color="amber"
                className="rounded-circle"
                style={{ width: 250, height: 250, fontSize: 18 }}
                onClick={this.handleSelect(item.node)}
              >
                {item.node.name}
              </MDBBtn>
            </div>
          ))}
        </div>
        <MDBModal isOpen={this.state.visibility} toggle={this.toggle} centered>
          <MDBModalHeader toggle={this.toggle}>
            Create your model exam
          </MDBModalHeader>
          <MDBModalBody>{this.formViewFull()}</MDBModalBody>
        </MDBModal>
        <div className="patternSubWise" />
      </div>
    );
  }

  render() {
    if (!this.props.isAuthenticated) {
      return <Redirect to="/login" />;
    }
    if (this.props.isCreated && this.props.data !== null) {
      const url = "/edu/exam/mcq/view/" + this.props.data.uid;
      return <Redirect to={url} />;
    }

    var view;
    if (this.props.isLoading || this.props.isCreating) {
      view = this.loadingView();
    } else if (this.props.isLoaded) {
      view = this.subjectsView();
    } else {
      view = <h1 className="mt-5 text-center">Something went wrong</h1>;
    }
    return (
      <Layout>
        <Helmet>
          <title>Subject Based Model Test</title>
        </Helmet>

        {view}
      </Layout>
    );
  }
}

const mapToStateView = state => ({
  isLoading: state.folder.isLoading,
  isLoaded: state.folder.isLoaded,
  isFailed: state.folder.isFailed,
  subjects: state.folder.data,

  isCreating: state.exam.isCreating,
  isCreated: state.exam.isCreated,
  isCreationFailed: state.exam.isCreationFailed,
  data: state.exam.previewData,

  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(
  mapToStateView,
  { loadSubjects, createMCQExam }
)(View);
