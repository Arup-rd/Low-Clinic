import React from "react";
import { loadArticles, createArticle } from "../../controller/actions/article";
import { Loader } from "../../generic/widgets/misc";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import style from "./styles/Drafts.module.css";
import { Button } from "../../generic/widgets/button";
import { TextInput, TextArea } from "../../generic/widgets/forms";
import { Helmet } from "react-helmet";
import { MDBModal, MDBModalBody } from "mdbreact";

const ItemView = props => {
  return (
    <tr className={style.draftItem}>
      <td className={style.title}>
        <a href={`/drafting/${props.data.uid}`}>{props.data.title}</a>
      </td>
      <td>
        <a href="#1">label</a>
      </td>
      <td>{new Date().toLocaleDateString()}</td>
      <td>
        <Button className="btn-sm btn-primary">Update</Button>
      </td>
    </tr>
  );
};

const ListView = props => {
  return (
    <table className="table">
      <tbody>
        {props.data.map(item => (
          <ItemView data={item.node} />
        ))}
      </tbody>
    </table>
  );
};

class View extends React.Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isLoaded: PropTypes.bool.isRequired,
    isFailed: PropTypes.bool.isRequired,
    data: PropTypes.object,

    isArticleCreating: PropTypes.bool.isRequired,
    isArticleCreated: PropTypes.bool.isRequired,
    isArticleCreationFailed: PropTypes.bool.isRequired,
    newArticle: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      draftTitleInput: null,
      draftBodyInput: null,
      draftLableInput: null,

      isModalVisible: false
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount() {
    this.props.loadArticles();
  }

  componentWillUpdate(nextProps, nextStates) {
    if (this.props.isArticleCreating) {
      if (nextProps.isArticleCreated) {
        window.location.replace(
          `/drafting/${nextProps.newArticle.article.uid}`
        );
      } else if (nextProps.isArticleCreationFailed) {
        alert("Creation Failed");
      }
    }
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const data = {
      title: this.state.draftTitleInput,
      body: this.state.draftBodyInput,
      label: this.state.draftLableInput
    };
    this.setState({
      draftBodyInput: null,
      formNameInput: null,
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
              label="Draft Title"
              type="text"
              isRequired="true"
              onChange={event => {
                this.setState({ draftTitleInput: event.target.value });
              }}
            />
            <TextArea
              label="Draft Body"
              onChange={event => {
                this.setState({ draftBodyInput: event.target.value });
              }}
            />
            <TextInput
              label="Draft Label"
              type="text"
              isRequired="true"
              onChange={event => {
                this.setState({ draftLableInput: event.target.value });
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
    if (this.props.isLoading) {
      return (
        <div>
          <Loader />
        </div>
      );
    } else if (this.props.isFailed) {
      return <h4 className="text-danger">Failed to load</h4>;
    } else if (this.props.isLoaded) {
      return <ListView data={this.props.articleList} />;
    }
  }

  loadingView() {
    if (!this.props.isArticleCreating) {
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

  render() {
    return (
      <div>
        <Helmet>
          <title>Drafts</title>{" "}
        </Helmet>
        {this.loadingView()}
        <Button className={style.createButton} onClick={this.toggle()}>
          Create A New Draft
        </Button>
        {this.listView()}
        {this.formModalView()}
      </div>
    );
  }
}

const mapToState = state => ({
  isLoaded: state.drafting.isLoaded,
  isLoading: state.drafting.isLoading,
  isFailed: state.drafting.isFailed,
  articleList: state.drafting.articleList,
  isArticleCreating: state.drafting.isArticleCreating,
  isArticleCreated: state.drafting.isArticleCreated,
  isArticleCreationFailed: state.drafting.isArticleCreationFailed,
  newArticle: state.drafting.newArticle
});

export default connect(mapToState, { loadArticles, createArticle })(View);
