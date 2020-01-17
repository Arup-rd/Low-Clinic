import React from "react";
import { Layout } from "../../../generic/base";
import { Helmet } from "react-helmet";
import { Statistics, ExamDetails } from "./components/examitems";
import { default as ExamAnswerSheet } from "./components/examsheet";
import { Loader } from "../../../generic/widgets/misc";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { default as ReportView } from "./components/report";
import {
  loadMCQExamPreview,
  submitExam
} from "../../../controller/actions/exam";
import {
  ACTION_EXAM_START,
  ACTION_EXAM_SUBMIT,
  ACTION_EXAM_REPORT
} from "./components/actions";
import { default as ErrorView } from "../../../pages/error";

class View extends React.Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    user: PropTypes.object,
    loadMCQExamPreview: PropTypes.func.isRequired,

    isLoading: PropTypes.bool.isRequired,
    isFailed: PropTypes.bool.isRequired,
    isLoaded: PropTypes.bool.isRequired,
    data: PropTypes.object,

    isExamSubmitRequestLoading: PropTypes.bool.isRequired,
    isExamSubmitRequestSuccess: PropTypes.bool.isRequired,
    isExamSubmitRequestFailed: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      shouldRender: false,
      isInvalid: false,

      isReportRender: false,

      isExamRunning: false
    };
  }

  componentDidMount() {
    var arr = this.props.location.pathname.split("/");
    let id = arr[5];
    if (id !== String(Number(id))) {
      this.setState({
        isInvalid: true,
        shouldRender: true
      });
    } else {
      this.setState({
        shouldRender: true,
        uid: id
      });
    }
    this.props.loadMCQExamPreview(id);
  }

  componentWillUpdate(nextProps, nextStates) {
    if (this.props.isExamSubmitRequestLoading) {
      if (nextProps.isExamSubmitRequestFailed) {
        alert("Exam Submit Failed. Resubmit");
        this.props.submitExam(this.state.answers);
      } else if (nextProps.isExamSubmitRequestSuccess) {
        this.setState({ isReportRender: true });
      }
    }
  }

  examInfoView() {
    let examDetails = {
      name: this.props.data.name,
      createdBy: this.props.data.createdBy,
      source: this.props.data.source,
      userAccount: this.props.user.account,
      mcqreport: this.props.data.mcqreport
    };
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <ExamDetails
              data={examDetails}
              isRunning={this.state.isExamRunning}
              onAction={this.actionListener}
            />
          </div>
          <div className="col-md-6">
            <Statistics data={this.props.data.source.statistics} />
          </div>
        </div>
      </div>
    );
  }

  actionListener = (action, data = null) => () => {
    if (action === ACTION_EXAM_START) {
      this.setState({ isExamRunning: true });
      return;
    }
    if (action === ACTION_EXAM_SUBMIT) {
      this.setState({ isExamRunning: false });
      this.handleExamSubmit(data);
      return;
    }
    if (action === ACTION_EXAM_REPORT) {
      this.setState({ isReportRender: true });
    }
  };

  handleExamSubmit(answers) {
    const obj = {
      user: this.props.user.account.id,
      exam: this.state.uid,
      omr: answers
    };
    this.setState({ answers: obj });
    this.props.submitExam(obj);
  }

  invalidView() {
    return (
      <Layout>
        <Helmet>
          <title>Invalid Call</title>
        </Helmet>
        <div className="mt-5">
          <h1>Invalid Call</h1>
        </div>
      </Layout>
    );
  }

  getExamContent() {
    if (this.state.isExamRunning) {
      return (
        <ExamAnswerSheet
          onAction={this.actionListener}
          examUid={this.state.uid}
        />
      );
    }
    return;
  }

  hasPermission() {
    if (!this.props.data.isPublic) {
      if (this.props.data.createdBy.id !== this.props.user.account.id) {
        return false;
      }
    }
    return true;
  }

  getView() {
    if (!this.hasPermission()) {
      return <ErrorView />;
    }
    return (
      <Layout>
        <Helmet>
          <title>MCQ Exam View</title>
        </Helmet>
        <div>
          <div className="container-fluid mt-4 mb-3">
            <div className="row flex-center">
              <div className="col-md-10 mb-5 list-group-item">
                {this.examInfoView()}
              </div>
            </div>
          </div>
          {this.getExamContent()}
        </div>
      </Layout>
    );
  }

  render() {
    if (!this.props.isAuthenticated) {
      return <Redirect to="/login" />;
    }
    if (!this.state.shouldRender && this.state.isInvalid) {
      return this.invalidView();
    }
    if (!(this.state.shouldRender && this.props.user)) {
      return <Loader />;
    }
    if (this.state.isReportRender) {
      return <ReportView uid={this.state.uid} />;
    }
    if (this.props.isLoaded) {
      return this.getView();
    }
    return <Loader />;
  }
}

const mapStateToView = state => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,

  isLoading: state.exam.isLoading,
  isFailed: state.exam.isFailed,
  isLoaded: state.exam.isLoaded,
  data: state.exam.previewData,

  isExamSubmitRequestLoading: state.exam.isExamSubmitRequestLoading,
  isExamSubmitRequestSuccess: state.exam.isExamSubmitRequestSuccess,
  isExamSubmitRequestFailed: state.exam.isExamSubmitRequestFailed
});

export default connect(
  mapStateToView,
  { loadMCQExamPreview, submitExam }
)(View);
