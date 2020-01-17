import React, { Component } from "react";
import { Layout } from "../../../generic/base";
import { HomeCard } from "../../../generic/card";
import {
  MDBContainer,
  MDBRow,
  MDBModal,
  MDBModalBody,
  MDBModalHeader
} from "mdbreact";
import PropTypes from "prop-types";
import Select from "react-select";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  loadPublicMCQExams,
  createMCQExam
} from "../../../controller/actions/exam";
import { loadSubjects } from "../../../controller/actions/folder";
import { Helmet } from "react-helmet";

class ExamType extends Component {
  static propTypes = {
    isCreating: PropTypes.bool.isRequired,
    isCreated: PropTypes.bool.isRequired,
    isCreationFailed: PropTypes.bool.isRequired,

    createMCQExam: PropTypes.func.isRequired,
    loadSubjects: PropTypes.func.isRequired,

    subjectList: PropTypes.array.isRequired,
    user: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      visibility: false,
      subjects: [],

      name: "Exam",
      duration: 15,
      totalMcq: 25,
      public: true,
      selectedSubjects: [],
      isMulti: false,
      visibility2: false
    };
    this.onNameInput = this.onNameInput.bind(this);
    this.onCombinationChange = this.onCombinationChange.bind(this);
    this.onSubjectChoose = this.onSubjectChoose.bind(this);
    this.onPublicCheck = this.onPublicCheck.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFullSubmit = this.handleFullSubmit.bind(this);
  }

  componentDidMount() {
    this.props.loadSubjects();
  }

  componentDidUpdate(prevProps, prevStates) {
    if (prevProps.subjectList.length > 0 && prevStates.subjects.length === 0) {
      let subjects = [];
      prevProps.subjectList.map(item =>
        subjects.push({
          label: item.node.name,
          value: item.node.selfLoc.uid
        })
      );
      this.setState({ subjects: subjects });
    }
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

  onSubjectChoose(selectedSubjects) {
    this.setState({ selectedSubjects: selectedSubjects });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (
      this.state.selectedSubjects.length < 1 ||
      this.state.selectedSubjects.length > 5
    ) {
      alert("Select subject between 1 and 5 items");
      return;
    }

    let data = {
      name: this.state.name,
      public: this.state.public,
      created_by: this.props.user.account.id,
      duration: this.state.duration,
      total_mcq: this.state.totalMcq
    };
    // console.log(this.state.selectedSubjects);
    if (this.state.isMulti)
      this.props.createMCQExam(data, this.state.selectedSubjects);
    else this.props.createMCQExam(data, [this.state.selectedSubjects]);
  }

  handleFullSubmit(event) {
    event.preventDefault();

    let data = {
      name: this.state.name,
      public: this.state.public,
      created_by: this.props.user.account.id,
      duration: 60,
      total_mcq: 100
    };
    var subjects = [];
    for (const subject of this.props.subjectList) {
      subjects.push({
        label: subject.node.name,
        value: subject.node.selfLoc.uid
      });
    }

    this.props.createMCQExam(data, subjects);
  }

  toggle = () => () => {
    this.setState({
      isMulti: false,
      visibility: !this.state.visibility
    });
  };

  toggle2 = () => () => {
    this.setState({
      visibility2: !this.state.visibility2
    });
  };

  toggleMulti = () => () => {
    this.setState({
      isMulti: true,
      visibility: !this.state.visibility
    });
  };

  formView() {
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
          onSubmit={this.handleSubmit}
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

        <div className="mb-3">
          <label className="mb-0">Choose Subjects</label>
          {this.state.isMulti ? (
            <Select
              isMulti
              options={this.state.subjects}
              onChange={this.onSubjectChoose}
            />
          ) : (
            <Select
              options={this.state.subjects}
              onChange={this.onSubjectChoose}
            />
          )}
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
      <form method="POST" onSubmit={this.handleFullSubmit}>
        <label className="mb-0">Set your exam name (*optional):</label>
        <input
          onChange={this.onNameInput}
          placeholder="Name"
          type="text"
          className="form-control mb-3"
        />
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

  render() {
    if (!this.props.isAuthenticated) {
      return <Redirect to="/login" />;
    }
    if (this.props.isCreated) {
      const url = "/edu/exam/mcq/view/" + this.props.data.uid;
      return <Redirect to={url} />;
    }
    return (
      <Layout>
        <Helmet>
          <title>MCQ Exam Types</title>
        </Helmet>
        <MDBContainer style={{ marginTop: 100, minHeight: "75vh" }}>
          <MDBRow>
            <div
              className="d-flex flex-column flex-lg-row align-items-stretch justify-content-center align-content-stretch no-wrap"
              style={{ width: "100%" }}
            >
              <HomeCard
                name="বিষয়ভিত্তিক মডেল টেস্ট"
                url="/edu/exam/mcq/subjectwise"
                icon="book-open"
                // onClick={this.toggle()}
              ></HomeCard>
              <HomeCard
                name="একাধিক বিষয়ে মডেল টেস্ট"
                url="#"
                icon="check-double"
                onClick={this.toggleMulti()}
              ></HomeCard>
              <HomeCard
                name="পুর্নাঙ্গ মডেল টেস্ট"
                url="#"
                icon="book"
                onClick={this.toggle2()}
              ></HomeCard>
              <HomeCard
                name="মডেল টেস্ট প্রতিযোগিতা"
                url="#"
                icon="stopwatch"
              ></HomeCard>
              <HomeCard
                name="পাবলিক মডেল টেস্ট"
                url="/edu/exam/mcq/public"
                icon="users"
              ></HomeCard>
            </div>
          </MDBRow>
        </MDBContainer>
        <div className="pattern" />

        <div>
          <MDBModal
            isOpen={this.state.visibility}
            toggle={this.toggle()}
            centered
          >
            <MDBModalHeader toggle={this.toggle()}>
              Create your model exam
            </MDBModalHeader>
            <MDBModalBody>{this.formView()}</MDBModalBody>
          </MDBModal>

          <MDBModal
            isOpen={this.state.visibility2}
            toggle={this.toggle2()}
            centered
          >
            <MDBModalHeader toggle={this.toggle2()}>
              Create your model exam
            </MDBModalHeader>
            <MDBModalBody>{this.formViewFull()}</MDBModalBody>
          </MDBModal>
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

  subjectList: state.folder.data,

  isCreating: state.exam.isCreating,
  isCreated: state.exam.isCreated,
  isCreationFailed: state.exam.isCreationFailed,
  data: state.exam.previewData,

  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(
  mapStateToView,
  { loadPublicMCQExams, createMCQExam, loadSubjects }
)(ExamType);
