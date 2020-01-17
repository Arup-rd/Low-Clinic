import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Loader } from "../../../generic/widgets/misc";
import { Helmet } from "react-helmet";
import { Layout } from "../../../generic/base";
import { loadSubjects, createFolder } from "../../../controller/actions/folder";
import { AddFolder } from "../../../generic/modals";
import { Notify } from "../../../generic/notification";
// import { Redirect } from "react-router-dom";
import { MDBBtn } from "mdbreact";

class View extends React.Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    user: PropTypes.object,

    loadSubjects: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    isLoaded: PropTypes.bool,
    subjects: PropTypes.array,

    isSubjectCreating: PropTypes.bool,
    isSubjectCreated: PropTypes.bool,
    isSubjectCreationFailed: PropTypes.bool,
    subjectFolder: PropTypes.object,
    createFolder: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      subjectName: "",
      totalSubjects: 0,
      notify: false
    };

    this.onSubjectNameInput = this.onSubjectNameInput.bind(this);
    this.onSubjectSubmit = this.onSubjectSubmit.bind(this);
    this.addFolderController = this.addFolderController.bind(this);
  }

  addFolderController(modelVisibility) {
    this.setState({ modelVisibility: modelVisibility });
  }

  componentDidMount() {
    this.props.loadSubjects();
  }

  onSubjectNameInput(event) {
    this.setState({
      subjectName: event.target.value
    });
  }

  componentWillUpdate(nextProps, nextStates) {
    if (nextProps.isSubjectCreated) {
      if (nextProps.subjects.length !== nextStates.totalSubjects) {
        this.setState({
          notify: true,
          totalSubjects: nextProps.subjects.length
        });
      }
    }
  }

  componentDidUpdate(prevProps, prevStates) {
    if (prevStates.notify) {
      this.setState({ notify: false });
    }
  }

  onSubjectSubmit(event) {
    event.preventDefault();
    let data = {
      name: this.state.subjectName,
      distance: 0,
      category: "Subject"
    };

    this.props.createFolder(data);
  }

  addSubjectButton() {
    return (
      <AddFolder
        header="Add Subject"
        addFolderController={this.addFolderController}
      >
        <form method="POST" onSubmit={this.onSubjectSubmit}>
          <input
            type="text"
            className="form-control"
            placeholder="Subject Name"
            onChange={this.onSubjectNameInput}
          />
          {this.props.isFolderCreating ? (
            <button className="btn btn-sm btn-green disabled">
              Creating
              <div className="spinner-border spinner-border-sm"></div>
            </button>
          ) : (
            <button
              type="submit"
              onSubmit={this.onSubjectSubmit}
              className="btn btn-sm btn-green"
            >
              Create
            </button>
          )}
        </form>
      </AddFolder>
    );
  }

  render() {
    // if (!this.props.isAuthenticated) {
    //   return <Redirect to="/login" />;
    // }

    if (this.state.notify) {
      this.state.modelVisibility(false);
    }

    const subjectList = this.props.subjects.map(item => (
      <div key={item.node.selfLoc.id}>
        <MDBBtn
          color="amber"
          className="rounded-circle"
          style={{ width: 250, height: 250, fontSize: 18 }}
          onClick={() => {
            window.location.href = `/edu/notes/folder/?location=${item.node.selfLoc.id}`;
          }}
        >
          {item.node.name}
        </MDBBtn>
      </div>
    ));

    const loadingView = (
      <div>
        <Loader />
      </div>
    );

    let addSubjectView = <span></span>;
    if (this.props.user) {
      if (this.props.user.account.isStaff) {
        addSubjectView = this.addSubjectButton();
      }
    }

    return (
      <Layout>
        <Helmet>
          <title>Notes</title>
        </Helmet>
        <div className="container-fluid mt-4">
          <p className="display-4 text-center">Pick Your Subject</p>

          <div className="container d-flex flex-wrap justify-content-center">
            {this.props.isLoaded ? subjectList : loadingView}
          </div>
        </div>
        {this.state.notify ? (
          <Notify title="Folder Creation" message="Success" />
        ) : (
          <span></span>
        )}
        {addSubjectView}
      </Layout>
    );
  }
}

const mapStateToNotes = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,

  isLoading: state.folder.isLoading,
  isLoaded: state.folder.isLoaded,
  subjects: state.folder.data,

  isSubjectCreating: state.folder.isFolderCreating,
  isSubjectCreated: state.folder.isFolderCreated,
  isSubjectCreationFailed: state.folder.isFolderCreationFailed,
  subjectFolder: state.folder.createdFolder
});

export default connect(mapStateToNotes, { loadSubjects, createFolder })(View);
