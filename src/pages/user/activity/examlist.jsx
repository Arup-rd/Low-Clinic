import React from "react";
import PropType from "prop-types";
import { connect } from "react-redux";
import { loadUserExams } from "../../../controller/actions/exam";
import { ExamStatistics } from "./statistics";
import { Loader } from "../../../generic/widgets/misc";

class View extends React.Component {
  static propsTypes = {
    loadUserExams: PropType.func.isRequired,

    isUserExamsLoading: PropType.bool.isUserExamsLoading,
    isUserExamsLoaded: PropType.bool.isUserExamsLoaded,
    isUserExamesLoadFailed: PropType.bool.isUserExamesLoadFailed,
    userExams: PropType.array.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      isStatisticsLoaded: false
    };
  }

  componentDidMount() {
    this.props.loadUserExams();
  }

  componentDidUpdate(prevProps, prevStates) {
    if (this.props.isUserExamsLoaded) {
      if (prevProps.isUserExamsLoading) {
        this.filterExamStatistics();
      }
    }
  }

  filterExamStatistics = () => {
    let examStatistics = [];
    let item = null;

    let iterIndex = -1;
    for (const exam of this.props.userExams) {
      item = JSON.parse(exam.node.source.statistics);
      for (const iter of item) {
        iterIndex = examStatistics.findIndex(obj => {
          return obj.folder_self_loc === iter.folder_self_loc;
        });
        if (iterIndex !== -1) {
          examStatistics[iterIndex].questions += iter.questions;
        } else {
          examStatistics.push(iter);
        }
      }
    }
    this.setState({
      examStatistics: examStatistics,
      isStatisticsLoaded: true
    });
  };

  getExamURL(item) {
    return "/edu/exam/mcq/view/" + item.node.uid;
  }

  getExamTableView() {
    return (
      <div>
        <table className="table">
          <thead className="bg-warning">
            <tr>
              <th>Name</th>
              <th>Questions</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {this.props.userExams.map(item => (
              <tr key={item.node.uid}>
                <td>
                  <a className="font-weight-boldz" href={this.getExamURL(item)}>
                    {item.node.name}
                  </a>
                </td>
                <td>{item.node.source.totalMcq}</td>
                <td>{new Date(item.node.dateTime).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  getExamStatistic() {
    if (!this.state.isStatisticsLoaded) {
      return <Loader />;
    }
    return <ExamStatistics data={this.state.examStatistics} />;
  }

  render() {
    return (
      <div>
        {this.getExamStatistic()}
        <br />
        {this.getExamTableView()}
      </div>
    );
  }
}

const mapStateToView = state => ({
  isUserExamsLoading: state.exam.isUserExamsLoading,
  isUserExamsLoaded: state.exam.isUserExamsLoaded,
  isUserExamesLoadFailed: state.exam.isUserExamesLoadFailed,
  userExams: state.exam.userExams
});

export default connect(
  mapStateToView,
  { loadUserExams }
)(View);
