import React from "react";
import {
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBIcon,
  MDBBtn,
  MDBModal,
  MDBModalBody
} from "mdbreact";
import ReactCountdownClock from "react-countdown-clock";
import { connect } from "react-redux";
import { loadMCQExamSheet } from "../../../../controller/actions/exam";
import { SERVER } from "../../../../controller/actions/config";
import { Loader } from "../../../../generic/widgets/misc";
import { TextArea } from "../../../../generic/widgets/forms";
import PropTypes from "prop-types";
import axios from "axios";
import { ACTION_EXAM_SUBMIT } from "./actions";

const OMR = props => {
  return (
    <div className="custom-control custom-checkbox mb-2">
      <input
        type="checkbox"
        className="custom-control-input"
        id={props.id}
        checked={props.checked}
        onChange={props.onClick}
      />
      <label className="custom-control-label" htmlFor={props.id}>
        {props.children}
      </label>
    </div>
  );
};

class ExamItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisibility: false,
      issueText: null
    };

    this.handleIssueSubmit = this.handleIssueSubmit.bind(this);
  }

  onChoose = option => () => {
    if (this.props.omr.answer !== option)
      this.props.onChange(this.props.data.mcq.uid, option);
    else this.props.onChange(this.props.data.mcq.uid, 0);
  };

  toggle = () => () => {
    this.setState({ modalVisibility: !this.state.modalVisibility });
  };

  async submitIssueToServer(data) {
    var formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    const config = {
      headers: {
        Authorization: `Token ${this.props.accessToken}`
      }
    };
    await axios.post(`${SERVER}/api/blog/mcq-issue/create/`, formData, config);
  }

  handleIssueSubmit(event) {
    event.preventDefault();
    if (this.state.issueText === null) {
      return;
    }
    const data = {
      mcq: this.props.data.mcq.uid,
      body: this.state.issueText
    };
    this.setState({
      modalVisibility: false,
      issueText: null
    });
    this.submitIssueToServer(data)
      .then(res => {
        alert("Issue Submitted");
      })
      .catch(err => {
        alert("Something went wrong");
      });
  }

  modalView() {
    return (
      <MDBModal isOpen={this.state.modalVisibility} toggle={this.toggle()}>
        <MDBModalBody>
          <form method="POST" onSubmit={this.handleIssueSubmit}>
            <TextArea
              label="Issue"
              isrequired="true"
              onChange={event => {
                this.setState({ issueText: event.target.value });
              }}
            />
            <MDBBtn
              type="submit"
              className="btn-sm"
              onSubmit={this.handleIssueSubmit}
            >
              Submit
            </MDBBtn>
            <MDBBtn className="btn-sm" color="red" onClick={this.toggle()}>
              Cancel
            </MDBBtn>
          </form>
        </MDBModalBody>
      </MDBModal>
    );
  }

  options() {
    return (
      <div>
        <OMR
          id={`check1${this.props.data.mcq.uid}`}
          checked={this.props.omr.answer === 1 ? true : false}
          onClick={this.onChoose(1)}
        >
          {this.props.data.mcq.option1}
        </OMR>

        <OMR
          id={`check2${this.props.data.mcq.uid}`}
          checked={this.props.omr.answer === 2 ? true : false}
          onClick={this.onChoose(2)}
        >
          {this.props.data.mcq.option2}
        </OMR>

        <OMR
          id={`check3${this.props.data.mcq.uid}`}
          checked={this.props.omr.answer === 3 ? true : false}
          onClick={this.onChoose(3)}
        >
          {this.props.data.mcq.option3}
        </OMR>

        <OMR
          id={`check4${this.props.data.mcq.uid}`}
          checked={this.props.omr.answer === 4 ? true : false}
          onClick={this.onChoose(4)}
        >
          {this.props.data.mcq.option4}
        </OMR>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.modalView()}
        <MDBCard>
          <MDBCardHeader>
            <div>
              <h6
                style={{
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  float: "left"
                }}
                className="mt-2"
              >
                {this.props.data.mcq.question}
              </h6>
              <MDBIcon
                icon="question"
                style={{ float: "right", color: "red", cursor: "pointer" }}
                className="mt-2"
                onClick={this.toggle()}
              />
            </div>
          </MDBCardHeader>
          <MDBCardBody>{this.options()}</MDBCardBody>
        </MDBCard>
      </div>
    );
  }
}

class ExamOMRSheet extends React.Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    user: PropTypes.object,
    accessToken: PropTypes.string.isRequired,
    examUid: PropTypes.string.isRequired,

    isSheetLoading: PropTypes.bool.isRequired,
    isSheetLoaded: PropTypes.bool.isRequired,
    isSheetLoadFailed: PropTypes.bool.isRequired,
    examSheetData: PropTypes.array,
    examDuration: PropTypes.number.isRequired,
    loadMCQExamSheet: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      uidList: [],
      isOMRSheetReady: false,
      isOwner: true
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.props.loadMCQExamSheet(this.props.examUid);
  }

  componentWillUpdate(nextProps, nextStates) {
    if (!this.state.isOMRSheetReady) {
      if (this.props.isSheetLoading && nextProps.isSheetLoaded) {
        let answerSheet = [];
        for (const item of nextProps.examSheetData) {
          answerSheet.push({ mcq: item.node.mcq.uid, answer: 0 });
        }
        this.setState({
          answers: answerSheet,
          isOMRSheetReady: true
        });
      }
    }
  }

  onChange(uid, ans) {
    var answers = this.state.answers;
    var index = answers.findIndex(obj => obj.mcq === uid);
    answers[index].answer = ans;
    this.setState({
      answers: answers
    });
  }

  getAnswerSheet() {
    if (!this.state.isOMRSheetReady) {
      return <Loader />;
    }
    return (
      <div>
        <div className="container-fluid">
          <div className="row flex-center">
            {this.props.examSheetData.map(item => (
              <div key={item.node.mcq.uid} className="col-md-10 mb-1 mt-1">
                <ExamItem
                  accessToken={this.props.accessToken}
                  data={item.node}
                  omr={this.state.answers.find(
                    obj => obj.mcq === item.node.mcq.uid
                  )}
                  onChange={this.onChange}
                />
              </div>
            ))}
          </div>
        </div>
        <MDBBtn
          onClick={this.props.onAction(ACTION_EXAM_SUBMIT, this.state.answers)}
          className="rounded-circle p-0 font-weight-bolder position-fixed"
          style={{
            width: 90,
            height: 90,
            fontWeight: "brotliDecompress",
            fontSize: 50,
            zIndex: 100,
            bottom: 20,
            right: 20
          }}
        >
          <MDBIcon icon="check" />
        </MDBBtn>
        <div
          style={{
            position: "fixed",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)"
          }}
        >
          <ReactCountdownClock
            seconds={60 * this.props.examDuration}
            color="#000000"
            alpha={0.5}
            size={100}
            onComplete={this.props.onAction(
              ACTION_EXAM_SUBMIT,
              this.state.answers
            )}
          />
        </div>
      </div>
    );
  }

  render() {
    return <div>{this.getAnswerSheet()}</div>;
  }
}

const mapStateToView = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  accessToken: state.auth.access,

  isSheetLoading: state.exam.isExamSheetLoading,
  isSheetLoaded: state.exam.isExamSheetLoadSuccess,
  isSheetLoadFailed: state.exam.isExamSheetLoadFailed,
  examSheetData: state.exam.examSheetData,
  examDuration: state.exam.examDuration
});

export default connect(
  mapStateToView,
  { loadMCQExamSheet }
)(ExamOMRSheet);
