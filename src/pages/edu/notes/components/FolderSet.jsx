import React from "react";
import PropTypes from "prop-types";
import { MDBIcon, MDBModal, MDBModalBody, MDBCollapse } from "mdbreact";
import { TextInput, Select } from "../../../../generic/widgets/forms";
import { Button } from "../../../../generic/widgets/button";
import { createFolder } from "../../../../controller/actions/folder";
import { connect } from "react-redux";
import style from "./styles/FolderSet.module.css";
import { Loader } from "../../../../generic/widgets/misc";

const FolderItem = props => {
  return (
    <div className="col-auto">
      <figure className={style.folderCard}>
        <MDBIcon icon="folder" />
        <a href={`/edu/notes/folder/?location=${props.data.selfLoc.id}`}>{}</a>
        <span>{`${props.data.category.name} : ${props.data.name}`}</span>
      </figure>
    </div>
  );
};

class FolderSetView extends React.Component {
  static propTypes = {
    folderList: PropTypes.array.isRequired,
    rootFolder: PropTypes.object.isRequired,

    isFolderCreating: PropTypes.bool,
    isFolderCreated: PropTypes.bool,
    isFolderCreationFailed: PropTypes.bool,
    newFolder: PropTypes.object,
    createFolder: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      folderList: props.folderList,
      isCollapsed: false,
      formNameInput: null,
      formCategoryInput: null,
      formModalVisibility: false
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentWillUpdate(nextProps, nextStates) {
    if (nextProps.isFolderCreationFailed) {
      if (this.props.isFolderCreating) {
        alert("folder creation failed");
      }
    }
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const data = {
      name: this.state.formNameInput,
      category: this.state.formCategoryInput,
      distance: this.props.rootFolder.distance + 1,
      root_loc: this.props.rootFolder.selfLoc.uid
    };
    this.setState({ formModalVisibility: false });
    this.props.createFolder(data);
  }

  toggle = () => () => {
    this.setState({ formModalVisibility: !this.state.formModalVisibility });
  };

  formModalView() {
    const folderCategories = [
      { label: "Chapter", value: "Chapter" },
      { label: "Part", value: "Part" },
      { label: "Topic", value: "Topic" }
    ];
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
            <Select
              label="Category"
              options={folderCategories}
              onChange={event => {
                this.setState({ formCategoryInput: event.target.value });
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
    if (this.state.folderList.length === 0) {
      return (
        <div className="mt-4 ml-3">
          <b>No Item Avaiable</b>
        </div>
      );
    }
    return (
      <div className="container-fluid">
        <div className="row">
          {this.state.folderList.map(item => (
            <FolderItem key={item.node.selfLoc.uid} data={item.node} />
          ))}
        </div>
      </div>
    );
  }

  loadingView() {
    if (!this.props.isFolderCreating) {
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

  newFolder() {
    if (!this.props.user.account.isStaff) {
      return;
    }
    return (
      <MDBIcon
        icon="folder-plus"
        style={{ marginLeft: "20px", cursor: "pointer" }}
        onClick={this.toggle()}
      >
        NewFolder
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
          {`Folders`}
          {this.state.isCollapsed ? (
            <MDBIcon icon="angle-down" />
          ) : (
            <MDBIcon icon="angle-right" />
          )}
        </span>
        {this.newFolder()}
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

  isFolderCreating: state.folder.isFolderCreating,
  isFolderCreated: state.folder.isFolderCreated,
  isFolderCreationFailed: state.folder.isFolderCreationFailed,
  newFolder: state.folder.createdFolder
});

export default connect(
  mapToStateFolder,
  { createFolder }
)(FolderSetView);
