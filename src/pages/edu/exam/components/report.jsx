import React from "react";
import PropTypes from "prop-types";
import { loadMCQExamReport } from "../../../../controller/actions/exam";
import { connect } from "react-redux";
import { Statistics, ExamDetails } from "./examitems";
import { Loader } from "../../../../generic/widgets/misc";
import { Layout } from "../../../../generic/base";
import { Helmet } from "react-helmet";
import { ReportDetails } from "./examitems";

const Item = props => {
  let userAnswer = "None";
  switch (props.data.node.answer) {
    case 1:
      userAnswer = `a) ${props.data.node.mcq.option1}`;
      break;
    case 2:
      userAnswer = `b) ${props.data.node.mcq.option2}`;
      break;
    case 3:
      userAnswer = `c) ${props.data.node.mcq.option3}`;
      break;
    case 4:
      userAnswer = `d) ${props.data.node.mcq.option4}`;
      break;
    default:
      break;
  }

  let rightAnswer = null;
  switch (props.data.node.mcq.answer) {
    case 1:
      rightAnswer = `a) ${props.data.node.mcq.option1}`;
      break;
    case 2:
      rightAnswer = `b) ${props.data.node.mcq.option2}`;
      break;
    case 3:
      rightAnswer = `c) ${props.data.node.mcq.option3}`;
      break;
    case 4:
      rightAnswer = `d) ${props.data.node.mcq.option4}`;
      break;
    default:
      break;
  }

  return (
    <div
      className={
        props.data.node.correct
          ? "list-group-item list-group-item-success mb-1 font-weight-bolder"
          : "list-group-item list-group-item-danger mb-1 font-weight-bolder"
      }
    >
      <p className="h6">{props.data.node.mcq.question}</p>

      <div className="mt-1 mb-1">
        <p className="d-inline-block ml-1 mr-1">
          a) {props.data.node.mcq.option1}
        </p>
        <p className="d-inline-block ml-1 mr-1">
          b) {props.data.node.mcq.option2}
        </p>
        <p className="d-inline-block ml-1 mr-1">
          c) {props.data.node.mcq.option3}
        </p>
        <p className="d-inline-block ml-1 mr-1">
          d) {props.data.node.mcq.option4}
        </p>
      </div>

      <div className="list-group-item">
        <p>Correct: {rightAnswer}</p>
        <p>Yours: {userAnswer} </p>
        <p className="text-dark mt-1">{props.data.node.mcq.summary}</p>
      </div>
    </div>
  );
};

class View extends React.Component {
  static propTypes = {
    uid: PropTypes.string.isRequired,
    data: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.loadMCQExamReport(this.props.uid);
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

  reportDetails() {
    let data = {
      createdBy: this.props.data.createdBy.name,
      duration: this.props.data.source.duration,
      totalMCQ: this.props.data.source.totalMcq,
      totalBlank: this.props.data.mcqreport.totalBlank,
      totalWrong: this.props.data.mcqreport.totalWrong,
      totalCorrect: this.props.data.mcqreport.totalCorrect,
      result: this.props.data.mcqreport.result,
      dateTime: this.props.data.mcqreport.dateTime
    };
    return (
      <div className="list-group-item mb-2 bg-dark text-white">
        <ReportDetails data={data} />
      </div>
    );
  }

  reportSheet() {
    return (
      <div>
        {this.props.data.mcqreport.omrSet.edges.map(item => (
          <Item key={item.node.mcq.uid} data={item} />
        ))}
      </div>
    );
  }

  getReportContent() {
    return (
      <div className="container-fluid mt-4 mb-5">
        <div className="flex-center">
          <div className="col-md-10 list-group-item">
            {this.reportDetails()}
            {this.reportSheet()}
          </div>
        </div>
      </div>
    );
  }

  getView() {
    return (
      <Layout>
        <Helmet>
          <title>MCQ Exam Report</title>
        </Helmet>
        <div>
          <div className="container-fluid mt-4 mb-3">
            <div className="row flex-center">
              <div className="col-md-10 mb-5 list-group-item">
                {this.examInfoView()}
              </div>
            </div>
          </div>
          {this.getReportContent()}
        </div>
      </Layout>
    );
  }

  render() {
    console.log(this.props);
    if (this.props.isReportLoading || !this.props.isReportLoaded) {
      return <Loader />;
    }
    return this.getView();
  }
}

const mapStateToView = state => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,

  isReportLoading: state.exam.isReportLoading,
  isReportLoaded: state.exam.isReportLoaded,
  isReportLoadFailed: state.exam.isReportLoadFailed,
  data: state.exam.report
});

export default connect(
  mapStateToView,
  { loadMCQExamReport }
)(View);
