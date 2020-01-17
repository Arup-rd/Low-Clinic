import React, { Component } from "react";
import { MDBCard, MDBCardBody, MDBIcon } from "mdbreact";
import { loadOverview } from "../../controller/actions/dashboard";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Loader } from "../../generic/widgets/misc";
import style from "./styles/Overview.module.css";
import { Helmet } from "react-helmet";

const InfoCard = props => {
  return (
    <MDBCard color="amber">
      <MDBCardBody className={style.itemCard}>
        <div className={style.itemCardLeft}>
          <MDBIcon icon={props.icon} />
        </div>
        <div className={style.itemCardRight}>{props.value}</div>
      </MDBCardBody>
    </MDBCard>
  );
};

class View extends Component {
  static propTypes = {
    loadOverview: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isLoaded: PropTypes.bool.isRequired,
    isFailed: PropTypes.bool.isRequired,
    overviewData: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      users: 0,
      exams: 0
    };
  }

  componentDidMount() {
    this.props.loadOverview();
  }

  view() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <InfoCard
              icon="user"
              value={this.props.overviewData.totalAccount}
            />
          </div>
          <div className="col-md-3">
            <InfoCard
              icon="file-signature"
              value={this.props.overviewData.totalExam}
            />
          </div>
          <div className="col-md-3">
            <InfoCard
              icon="question"
              value={this.props.overviewData.totalPendingIssue}
            />
          </div>
        </div>
      </div>
    );
  }

  render() {
    // var totalUsers = 590;
    // var totalExams = 860;

    // setTimeout(
    //   function () {
    //     if (this.state.users < totalUsers)
    //       this.setState({
    //         users: this.state.users + parseInt(totalUsers / 200)
    //       });
    //     if (this.state.exams < totalExams)
    //       this.setState({
    //         exams: this.state.exams + parseInt(totalExams / 200)
    //       });

    //     if (this.state.users > totalUsers) this.setState({ users: totalUsers });
    //     if (this.state.exams > totalExams) this.setState({ exams: totalExams });
    //   }.bind(this),
    //   50
    // );

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
          <title>Overview</title>
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
  overviewData: state.dashboard.overviewData
});

export default connect(
  mapToloadIssue,
  { loadOverview }
)(View);
