import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Loader } from "../../generic/widgets/misc";
import { Helmet } from "react-helmet";
import { Layout } from "../../generic/base";
import { loadRoots, createDirectory } from "../../controller/actions/drafting";
import { AddFolder } from "../../generic/modals";
import { Notify } from "../../generic/notification";
// import { Redirect } from "react-router-dom";
import { MDBBtn } from "mdbreact";

class View extends React.Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    user: PropTypes.object,

    loadRoots: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    isLoaded: PropTypes.bool,
    roots: PropTypes.array,

    isRootCreating: PropTypes.bool,
    isRootCreated: PropTypes.bool,
    isRootCreationFailed: PropTypes.bool,
    rootDirectory: PropTypes.object,
    createDirectory: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      rootName: "",
      totalRoots: 0,
      notify: false
    };

    this.onRootNameInput = this.onRootNameInput.bind(this);
    this.onRootSubmit = this.onRootSubmit.bind(this);
    this.addFolderController = this.addFolderController.bind(this);
  }

  addFolderController(modelVisibility) {
    this.setState({ modelVisibility: modelVisibility });
  }

  componentDidMount() {
    this.props.loadRoots();
  }

  onRootNameInput(event) {
    this.setState({
      rootName: event.target.value
    });
  }

  componentWillUpdate(nextProps, nextStates) {
    if (nextProps.isRootCreated) {
      if (nextProps.roots.length !== nextStates.totalRoots) {
        this.setState({
          notify: true,
          totalRoots: nextProps.roots.length
        });
      }
    }
  }

  componentDidUpdate(prevProps, prevStates) {
    if (prevStates.notify) {
      this.setState({ notify: false });
    }
  }

  onRootSubmit(event) {
    event.preventDefault();
    let data = {
      name: this.state.rootName
    };

    this.props.createDirectory(data);
  }

  addSubjectButton() {
    return (
      <AddFolder
        header="Add Subject"
        addFolderController={this.addFolderController}
      >
        <form method="POST" onSubmit={this.onRootSubmit}>
          <input
            type="text"
            className="form-control"
            placeholder="Subject Name"
            onChange={this.onRootNameInput}
          />
          {this.props.isDirectoryCreating ? (
            <button className="btn btn-sm btn-green disabled">
              Creating
              <div className="spinner-border spinner-border-sm"></div>
            </button>
          ) : (
            <button
              type="submit"
              onSubmit={this.onRootSubmit}
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

    const subjectList = this.props.roots.map(item => (
      <div key={item.node.selfLoc.id}>
        <MDBBtn
          color="amber"
          className="rounded-circle"
          style={{ width: 250, height: 250, fontSize: 18 }}
          onClick={() => {
            window.location.href = `/drafting/directory/?location=${item.node.selfLoc.id}`;
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
          <title>Drafts</title>
        </Helmet>
        <div className="container-fluid mt-4">
          <p className="display-4 text-center">Pick Your Topic</p>

          {/* <div className="container d-flex flex-wrap justify-content-center">
            {this.props.isLoaded ? subjectList : loadingView}
          </div> */}
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

  isLoading: state.drafting.isLoading,
  isLoaded: state.drafting.isLoaded,
  roots: state.drafting.data,

  isRootCreating: state.drafting.isDirectoryCreating,
  isRootCreated: state.drafting.isDirectoryCreated,
  isRootCreationFailed: state.drafting.isDirectoryCreationFailed,
  rootDirectory: state.drafting.createdDirectory
});

export default connect(mapStateToNotes, { loadRoots, createDirectory })(View);
