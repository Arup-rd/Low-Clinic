import React from "react";
import PropTypes from "prop-types";
import { TextInput, TextArea } from "../../../../generic/widgets/forms";
import { Button } from "../../../../generic/widgets/button";
import { createPost } from "../../../../controller/actions/post";
import { connect } from "react-redux";
import { MDBIcon, MDBModal, MDBModalBody } from "mdbreact";
import style from "./styles/PostSet.module.css";
import { Loader } from "../../../../generic/widgets/misc";

const PostItem = props => {
  return (
    <tr className={style.contentItem}>
      <td className={style.title}>
        <MDBIcon icon="sticky-note" />
        <a href={`/edu/notes/content/?uid=${props.data.uid}`}>
          {props.data.title}
        </a>
      </td>
      <td>{new Date(props.data.dateTime).toLocaleString()}</td>
    </tr>
  );
};

class PostSetView extends React.Component {
  static propTypes = {
    postList: PropTypes.array.isRequired,
    rootFolder: PropTypes.object.isRequired,

    isPostCreating: PropTypes.bool.isRequired,
    isPostCreated: PropTypes.bool.isRequired,
    isPostCreationFailed: PropTypes.bool.isRequired,
    newPost: PropTypes.object,
    createPost: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      postList: props.postList,

      contentTitleInput: null,
      contentBodyInput: null,
      formModalVisibility: false
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentWillUpdate(nextProps, nextStates) {
    if (this.props.isPostCreating) {
      if (nextProps.isPostCreated) {
        let postList = this.state.postList;
        postList.push(nextProps.newPost);
      } else if (nextProps.isPostCreationFailed) {
        alert("Content creation failed");
      }
    }
  }

  toggle = () => () => {
    this.setState({ formModalVisibility: !this.state.formModalVisibility });
  };

  handleFormSubmit(event) {
    event.preventDefault();
    const data = {
      title: this.state.contentTitleInput,
      body: this.state.contentBodyInput,
      folder: this.props.rootFolder.selfLoc.uid,
      entry_by: this.props.user.account.id
    };
    this.setState({
      contentBodyInput: null,
      formNameInput: null,
      formModalVisibility: false
    });
    this.props.createPost(data);
  }

  toggle = () => () => {
    this.setState({ formModalVisibility: !this.state.formModalVisibility });
  };

  formModalView() {
    return (
      <MDBModal
        isOpen={this.state.formModalVisibility}
        toggle={this.toggle()}
        fullHeight
        position="bottom"
      >
        <MDBModalBody>
          <form method="POST" onSubmit={this.handleFormSubmit}>
            <TextInput
              label="Content Title"
              type="text"
              isRequired="true"
              onChange={event => {
                this.setState({ contentTitleInput: event.target.value });
              }}
            />
            <TextArea
              label="Content Body"
              onChange={event => {
                this.setState({ contentBodyInput: event.target.value });
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

  tableView() {
    if (this.state.postList.length === 0) {
      return (
        <div className="ml-4 mt-4">
          <b>No item available</b>
        </div>
      );
    }
    return (
      <table className="table mt-3">
        <tbody>
          {this.state.postList.map(item => (
            <PostItem key={item.uid} data={item} />
          ))}
        </tbody>
      </table>
    );
  }

  loadingView() {
    if (!this.props.isPostCreating) {
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

  newContent() {
    if (!this.props.user.account.isStaff) {
      return;
    }
    return (
      <MDBIcon
        icon="plus-square"
        style={{ marginLeft: "20px", cursor: "pointer" }}
        onClick={this.toggle()}
      >
        New Content
      </MDBIcon>
    );
  }

  render() {
    return (
      <div>
        {this.loadingView()}
        <span className={style.title}>{`Contents`}</span>
        {this.newContent()}
        {this.tableView()}
        {this.formModalView()}
      </div>
    );
  }
}

const mapToStatePost = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,

  isPostCreating: state.post.isPostCreating,
  isPostCreated: state.post.isPostCreated,
  isPostCreationFailed: state.post.isPostCreationFailed,
  newPost: state.post.createdPost
});

export default connect(
  mapToStatePost,
  { createPost }
)(PostSetView);
