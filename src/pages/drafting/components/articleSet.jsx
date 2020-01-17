import React from "react";
import PropTypes from "prop-types";
import { TextInput, TextArea } from "../../../generic/widgets/forms";
import { Button } from "../../../generic/widgets/button";
import { createArticle } from "../../../controller/actions/article";
import { connect } from "react-redux";
import { MDBIcon, MDBModal, MDBModalBody } from "mdbreact";
import style from "./styles/PostSet.module.css";
import { Loader } from "../../../generic/widgets/misc";

const PostItem = props => {
  return (
    <tr className={style.contentItem}>
      <td className={style.title}>
        <MDBIcon icon="sticky-note" />
        <a href={`/drafting/article/?uid=${props.data.uid}`}>
          {props.data.title}
        </a>
      </td>
      <td>{new Date(props.data.dateTime).toLocaleString()}</td>
    </tr>
  );
};

class ArticleSetView extends React.Component {
  static propTypes = {
    articleList: PropTypes.array.isRequired,
    rootDirectory: PropTypes.object.isRequired,

    isArticleCreating: PropTypes.bool.isRequired,
    isArticleCreated: PropTypes.bool.isRequired,
    isArticleCreationFailed: PropTypes.bool.isRequired,
    newArticle: PropTypes.object,
    createArticle: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      articleList: props.articleList,

      articleTitleInput: null,
      articleLabelInput: null,
      articleBodyInput: null,

      formModalVisibility: false
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentWillUpdate(nextProps, nextStates) {
    if (this.props.isArticleCreating) {
      if (nextProps.isArticleCreated) {
        let articleList = this.state.articleList;
        articleList.push(nextProps.newArticle);
      } else if (nextProps.isArticleCreationFailed) {
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
      title: this.state.articleTitleInput,
      body: this.state.articleBodyInput,
      label: this.state.articleLabelInput,
      directory: this.props.rootDirectory.selfLoc.uid
    };
    this.setState({
      articleTitleInput: null,
      articleLabelInput: null,
      articleBodyInput: null,
      formModalVisibility: false
    });
    this.props.createArticle(data);
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
              label="Article Title"
              type="text"
              isRequired="true"
              onChange={event => {
                this.setState({ articleTitleInput: event.target.value });
              }}
            />
            <TextInput
              label="Article Label"
              type="text"
              isRequired="true"
              onChange={event => {
                this.setState({ articleLabelInput: event.target.value });
              }}
            />
            <TextArea
              label="Article Body"
              onChange={event => {
                this.setState({ articleBodyInput: event.target.value });
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
    if (this.state.articleList.length === 0) {
      return (
        <div className="ml-4 mt-4">
          <b>No item available</b>
        </div>
      );
    }
    return (
      <table className="table mt-3">
        <tbody>
          {this.state.articleList.map(item => (
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
        New Article
      </MDBIcon>
    );
  }

  render() {
    return (
      <div>
        {this.loadingView()}
        <span className={style.title}>{`Articles`}</span>
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

  isArticleCreating: state.article.isArticleCreating,
  isArticleCreated: state.article.isArticleCreated,
  isArticleCreationFailed: state.article.isArticleCreationFailed,
  newArticle: state.article.createdArticle
});

export default connect(
  mapToStatePost,
  { createArticle }
)(ArticleSetView);
