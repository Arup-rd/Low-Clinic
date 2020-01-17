import React from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { Layout } from "../../../generic/base";
import PropType from "prop-types";
import { loadMCQBank, mcqIssueSend } from "../../../controller/actions/ques";
import { Redirect } from "react-router-dom";
import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBIcon,
  MDBPagination,
  MDBPageItem,
  MDBPageNav,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBModal,
  MDBModalHeader,
  MDBModalBody
} from "mdbreact";

class MCQItemView extends React.Component {
  static propTypes = {
    sendIssue: PropType.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      modalVisibility: false,
      issueText: "",
      ...props
    };
    this.onIssueInput = this.onIssueInput.bind(this);
    this.onIssueSubmit = this.onIssueSubmit.bind(this);
  }

  toggle = () => () => {
    this.setState({
      modalVisibility: !this.state.modalVisibility,
      issueText: ""
    });
  };

  onIssueInput(event) {
    this.setState({ issueText: event.target.value });
  }

  onIssueSubmit(event) {
    event.preventDefault();
    if (this.state.issueText === "") {
      return;
    }
    this.setState({ modalVisibility: false });
    const issue = {
      mcq: this.props.data.uid,
      body: this.state.issueText
    };

    this.props.sendIssue(issue);
  }

  issueFormView() {
    return (
      <form method="POST" onSubmit={this.onIssueSubmit}>
        <label className="mt-1 mb-0">Issue</label>
        <textarea
          className="form-control"
          value={this.state.issueText}
          onChange={this.onIssueInput}
        ></textarea>
        <button
          className="btn btn-sm btn-green mt-1"
          type="submit"
          onSubmit={this.onIssueSubmit}
        >
          Send
        </button>
      </form>
    );
  }

  report() {
    return (
      <div
        style={{
          width: "30px",
          height: "30px",
          float: "right",
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          backgroundColor: "red",
          color: "white",
          padding: "10px",
          borderRadius: "50%"
        }}
      >
        <MDBIcon icon="question" onClick={this.toggle()} />
        <MDBModal
          isOpen={this.state.modalVisibility}
          toggle={this.toggle()}
          center
          className="text-dark"
          // size="lg"
        >
          <MDBModalHeader toggle={this.toggle()}>
            What's your Issue?
          </MDBModalHeader>
          <MDBModalBody>{this.issueFormView()}</MDBModalBody>
        </MDBModal>
      </div>
    );
  }

  tags(data) {
    return data.map(item => (
      <MDBBtn
        key={item.node.folder.selfLoc.uid}
        style={{ borderRadius: "15px" }}
        className="btn-sm btn-blue"
        href="#1"
      >
        {item.node.folder.name}
      </MDBBtn>
    ));
  }

  render() {
    let answer = "No Answer";
    switch (this.state.data.answer) {
      case 1:
        answer = `a) ${this.state.data.option1}`;
        break;
      case 2:
        answer = `b) ${this.state.data.option2}`;
        break;
      case 3:
        answer = `c) ${this.state.data.option3}`;
        break;
      case 4:
        answer = `d) ${this.state.data.option4}`;
        break;
      default:
        break;
    }
    return (
      <MDBCard className="mb-2">
        <MDBCardHeader>
          <div style={{ width: "90%", float: "left" }}>
            <h5>{this.state.data.question}</h5>
          </div>
          {this.report()}
        </MDBCardHeader>
        <MDBCardBody>
          <div className="container-fluid">
            <div className="row">
              <div className="col-auto">a) {this.state.data.option1}</div>
              <div className="col-auto">b) {this.state.data.option2}</div>
              <div className="col-auto">c) {this.state.data.option3}</div>
              <div className="col-auto">d) {this.state.data.option4}</div>
            </div>
          </div>
          <blockquote className="blockquote bq-primary mt-3">
            <h6 className="text-primary">{answer}</h6>
            <p className="lead">{this.state.data.summary}</p>
          </blockquote>
          <div className="mt-2">
            Tags:
            {this.tags(this.state.data.mcqtagSet.edges)}
          </div>
        </MDBCardBody>
      </MDBCard>
    );
  }
}

class View extends React.Component {
  static propTypes = {
    isAuthenticated: PropType.bool.isRequired,
    loadMCQBank: PropType.func.isRequired,
    mcqIssueSend: PropType.func.isRequired,
    isLoading: PropType.bool,
    isLoaded: PropType.bool,
    questionList: PropType.array.isRequired
  };

  componentDidMount() {
    this.props.loadMCQBank();
  }

  goNextPage = () => () => {
    const arg = {
      key: "after",
      value: this.props.questionListPageInfo.endCursor
    };
    this.props.loadMCQBank(arg);
  };

  goPreviousPage = () => () => {
    const arg = {
      key: "before",
      value: this.props.questionListPageInfo.startCursor
    };
    this.props.loadMCQBank(arg);
  };

  pagination() {
    return (
      <MDBRow>
        <MDBCol>
          <MDBPagination className="mb-5">
            <MDBPageItem>
              <MDBPageNav aria-label="Previous" onClick={this.goPreviousPage()}>
                <span aria-hidden="true" className="font-weight-bolder h5">
                  Previous
                </span>
              </MDBPageNav>
            </MDBPageItem>
            <MDBPageItem>
              <MDBPageNav aria-label="Previous" onClick={this.goNextPage()}>
                <span aria-hidden="true" className="font-weight-bolder h5">
                  Next
                </span>
              </MDBPageNav>
            </MDBPageItem>
          </MDBPagination>
        </MDBCol>
      </MDBRow>
    );
  }

  view() {
    return (
      <div className="container-fluid">
        <div className="row flex-center">
          <div className="col-md-8">
            <div>
              {this.props.questionList.map(item => (
                <MCQItemView
                  key={item.node.uid}
                  data={item.node}
                  sendIssue={this.props.mcqIssueSend}
                />
              ))}
            </div>
            <br />
            <div className="flex-center">{this.pagination()}</div>
          </div>
        </div>
      </div>
    );
  }

  componentDidUpdate(prevProps, prevStates) {
    if (prevProps.isLoaded) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    if (!this.props.isAuthenticated) {
      return <Redirect to="/login" />;
    }

    const loadingView = (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status"></div>
      </div>
    );
    return (
      <Layout>
        <Helmet>
          <title>MCQ Bank</title>
        </Helmet>
        <div className="mt-5">
          {this.props.isLoaded ? this.view() : loadingView}
        </div>
      </Layout>
    );
  }
}

const mapToMCQState = state => ({
  isAuthenticated: state.auth.isAuthenticated,

  isLoading: state.ques.isListLoading,
  isLoaded: state.ques.isListLoaded,
  isFailed: state.ques.isListFailed,
  questionList: state.ques.questionList,
  questionListPageInfo: state.ques.questionListPageInfo
});

export default connect(
  mapToMCQState,
  { loadMCQBank, mcqIssueSend }
)(View);
