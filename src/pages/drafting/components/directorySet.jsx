import React from "react";
import PropTypes from "prop-types";
import { MDBIcon, MDBModal, MDBModalBody, MDBCollapse } from "mdbreact";
import { TextInput } from "../../../generic/widgets/forms";
import { Button } from "../../../generic/widgets/button";
import { createDirectory } from "../../../controller/actions/drafting";
import { connect } from "react-redux";
import style from "./styles/FolderSet.module.css";
import { Loader } from "../../../generic/widgets/misc";

const DirectoryItem = props => {
  return (
    <div className="col-auto">
      <figure className={style.folderCard}>
        <MDBIcon icon="folder" />
        <a href={`/drafting/directory/?location=${props.data.selfLoc.id}`}>
          {}
        </a>
        <span>{props.data.name}</span>
      </figure>
    </div>
  );
};

class DirectorySetView extends React.Component {
  static propTypes = {
    directoryList: PropTypes.array.isRequired,
    rootDirectory: PropTypes.object.isRequired,

    isDirectoryCreating: PropTypes.bool,
    isDirectoryCreated: PropTypes.bool,
    isDirectoryCreationFailed: PropTypes.bool,
    newDirectory: PropTypes.object,
    createDirectory: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      directoryList: props.directoryList,
      isCollapsed: false,
      formNameInput: null,
      formCategoryInput: null,
      formModalVisibility: false
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentWillUpdate(nextProps, nextStates) {
    if (nextProps.isDirectoryCreationFailed) {
      if (this.props.isDirectoryCreating) {
        alert("directory creation failed");
      }
    }
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const data = {
      name: this.state.formNameInput,
      root_loc: this.props.rootDirectory.selfLoc.uid
    };
    this.setState({ formModalVisibility: false });
    this.props.createDirectory(data);
  }

  toggle = () => () => {
    this.setState({ formModalVisibility: !this.state.formModalVisibility });
  };

  formModalView() {
    return (
      <MDBModal
        isOpen={this.state.formModalVisibility}
        toggle={this.toggle()}
        center
      >
        <MDBModalBody>
          <form method="POST" onSubmit={this.handleFormSubmit}>
            <TextInput
              label="Folder Name"
              type="text"
              onChange={event => {
                this.setState({ formNameInput: event.target.value });
              }}
            />
            <div className="mt-3 mb-3">
              <Button
                className="btn-sm btn-primary"
                type="submit"
                onSubmit={this.handleFormSubmit}
              >
                Create
              </Button>
              <Button className="btn-sm btn-danger" onClick={this.toggle()}>
                Cancel
              </Button>
            </div>
          </form>
        </MDBModalBody>
      </MDBModal>
    );
  }

  listView() {
    if (this.state.directoryList.length === 0) {
      return (
        <div className="mt-4 ml-3">
          <b>No Item Avaiable</b>
        </div>
      );
    }
    return (
      <div className="container-fluid">
        <div className="row">
          {this.state.directoryList.map(item => (
            <DirectoryItem key={item.node.selfLoc.uid} data={item.node} />
          ))}
        </div>
      </div>
    );
  }

  loadingView() {
    if (!this.props.isDirectoryCreating) {
      return;
    }
    return (
      <MDBModal isOpen={true} toggle={() => {}} center>
        <MDBModalBody>
          <Loader />
        </MDBModalBody>
      </MDBModal>
    );
  }

  newDirectory() {
    if (!this.props.user.account.isStaff) {
      return;
    }
    return (
      <MDBIcon
        icon="folder-plus"
        style={{ marginLeft: "20px", cursor: "pointer" }}
        onClick={this.toggle()}
      >
        New Directory
      </MDBIcon>
    );
  }

  render() {
    return (
      <div>
        {this.loadingView()}
        <span
          className={style.title}
          onClick={event => {
            this.setState({
              isCollapsed: !this.state.isCollapsed
            });
          }}
        >
          {`Direcories `}
          {this.state.isCollapsed ? (
            <MDBIcon icon="angle-down" />
          ) : (
            <MDBIcon icon="angle-right" />
          )}
        </span>
        {this.newDirectory()}
        <MDBCollapse className="mt-3" isOpen={!this.state.isCollapsed}>
          {this.listView()}
        </MDBCollapse>
        {this.formModalView()}
      </div>
    );
  }
}

const mapToStateFolder = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,

  isDirectoryCreating: state.drafting.isDirectoryCreating,
  isDirectoryCreated: state.drafting.isDirectoryCreated,
  isDirectoryCreationFailed: state.drafting.isDirectoryCreationFailed,
  newDirectory: state.drafting.createdDirectory
});

export default connect(mapToStateFolder, { createDirectory })(DirectorySetView);
