import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Layout } from "../../generic/base";
import { Loader } from "../../generic/widgets/misc";
import { Redirect } from "react-router-dom";
import { MDBIcon, MDBCard, MDBCardBody, MDBBtn } from "mdbreact";
import Avatar from "../../static/img/user.png";
import { Helmet } from "react-helmet";
import { MDBModal, MDBModalBody, MDBModalHeader } from "mdbreact";
import { loadUser, addUserInfo } from "../../controller/actions/auth";
import { default as ActivityView } from "./activity/examlist";

class View extends React.Component {
  static propTypes = {
    loadUser: PropTypes.func.isRequired,
    addUserInfo: PropTypes.func.isRequired,

    user: PropTypes.object,
    isAuthenticated: PropTypes.bool,
    isLoading: PropTypes.bool,
    isFailed: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.state = {
      modalVisibility: false,

      institutionName: "",
      barName: "",
      session: ""
    };

    this.handleInstitutionNameInput = this.handleInstitutionNameInput.bind(
      this
    );
    this.handleBarNameInput = this.handleBarNameInput.bind(this);
    this.handleSessionInput = this.handleSessionInput.bind(this);
    this.handleInfoSubmit = this.handleInfoSubmit.bind(this);
  }

  componentDidMount() {
    this.props.loadUser();
  }

  toggle = () => () => {
    this.setState({
      modalVisibility: !this.state.modalVisibility
    });
  };

  handleInstitutionNameInput(event) {
    this.setState({
      institutionName: event.target.value
    });
  }

  handleBarNameInput(event) {
    this.setState({
      barName: event.target.value
    });
  }

  handleSessionInput(event) {
    this.setState({ session: event.target.value });
  }

  handleInfoSubmit(event) {
    event.preventDefault();

    if (this.state.institutionName === "" || this.state.barName === "") {
      return;
    }

    if (isNaN(parseInt(this.state.session))) {
      return;
    }

    const obj = {
      institute: this.state.institutionName,
      bar: this.state.barName,
      session: this.state.session,
      account: this.props.user.account.id
    };
    this.setState({
      modalVisibility: false
    });

    this.props.addUserInfo(obj);
  }

  infoCreationForm() {
    return (
      <form method="POST" onSubmit={this.handleInfoSubmit}>
        <label className="mb-0 mt-1">Institution Name</label>
        <input
          type="text"
          className="form-control"
          onChange={this.handleInstitutionNameInput}
        />
        <label className="mb-0 mt-2">Bar Association</label>
        <input
          type="text"
          className="form-control"
          onChange={this.handleBarNameInput}
        />
        <label className="mb-0 mt-2">Session</label>
        <input
          type="text"
          className="form-control"
          onChange={this.handleSessionInput}
        />
        <button
          type="submit"
          onSubmit={this.handleInfoSubmit}
          className="btn btn-primary mt-3"
        >
          Add
        </button>
      </form>
    );
  }

  infoCreationModal() {
    return (
      <MDBModal
        isOpen={this.state.modalVisibility}
        toggle={this.toggle()}
        center
        position="center"
      >
        <MDBModalHeader toggle={this.toggle()}>
          Add Profile Information
        </MDBModalHeader>
        <MDBModalBody>{this.infoCreationForm()}</MDBModalBody>
      </MDBModal>
    );
  }

  profileInfo(profile) {
    return (
      <div className="mt-4">
        <p className="list-group-item">
          Institute: <span className="h6">{profile.institute}</span>
        </p>
        <p className="list-group-item">
          Bar Association: <span className="h6">{profile.bar}</span>
        </p>
        <p className="list-group-item">
          Session: <span className="h6">{profile.session}</span>
        </p>
      </div>
    );
  }

  infoView() {
    const gender = {
      "*": "Not to say",
      F: "Female",
      M: "Male",
      O: "Other"
    };
    return (
      <MDBCard className="shadow-box-example z-depth-2">
        <MDBCardBody className="card-background px-5">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-4">
                <img
                  src={Avatar}
                  className="img-fluid rounded-circle mb-4"
                  alt="Avatar"
                />
              </div>
              <div className="col-sm-8" style={{ fontSize: "1.5em" }}>
                <p className="lead">
                  <MDBIcon icon="user-alt" /> {this.props.user.account.name}
                </p>
                <p className="lead">
                  <MDBIcon icon="phone" /> {this.props.user.account.phone}
                </p>
                <p className="lead">
                  <MDBIcon icon="envelope" /> {this.props.user.account.email}
                </p>
                <p className="lead">
                  <MDBIcon icon="transgender-alt" />
                  {gender[this.props.user.account.gender]}
                </p>
                <MDBBtn
                  className="btn-sm"
                  color="amber"
                  href="/profile/update/"
                >
                  <MDBIcon style={{ fontSize: "15px" }} icon="cog">
                    Update
                  </MDBIcon>
                </MDBBtn>
              </div>
            </div>
          </div>
          <div>
            <div className="container-fluid">
              <div className="row flex-center">
                <div className="col-md-12">
                  {this.props.user.account.profile ? (
                    this.profileInfo(this.props.user.account.profile)
                  ) : (
                    <span></span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </MDBCardBody>
      </MDBCard>
    );
  }

  componentDidUpdate(prevProps, prevStates) {
    if (prevProps.user) {
      if (!prevProps.user.account.profile && !prevStates.modalVisibility) {
        this.setState({
          modalVisibility: true
        });
      }
    }
  }

  render() {
    if (!this.props.isAuthenticated) {
      return <Redirect to="/login" />;
    }

    if (this.props.isAuthenticated && this.props.user === null) {
      return <Loader />;
    }

    return (
      <Layout>
        <Helmet>
          <title>Profile</title>
        </Helmet>
        {this.infoCreationModal()}
        <div className="container-fluid mt-4">
          <div className="row mb-4 flex-center">
            <div className="col-md-8">{this.infoView()}</div>
          </div>
        </div>

        <div className="container-fluid mt-5 mb-5">
          <div className="row flex-center">
            <div className="col-md-8">
              {this.props.user ? <ActivityView /> : <div></div>}
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

const mapStateToProfile = state => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading,
  isFailed: state.auth.isFailed
});

export default connect(
  mapStateToProfile,
  { loadUser, addUserInfo }
)(View);
