import React from "react";
import { Loader } from "../../../generic/widgets/misc";
import { connect } from "react-redux";
import { loadMCQItem, updateMCQItem } from "../../../controller/actions/ques";
import { Layout } from "../../../generic/base";
import { default as ErrorView } from "../../error";
import { Helmet } from "react-helmet";
import { Button, SpinnerButton } from "../../../generic/widgets/button";

class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldRender: false,

      inputQuestion: null,
      inputOption1: null,
      inputOption2: null,
      inputOption3: null,
      inputOption4: null,
      inputAnswer: null,
      inputSummary: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    var arr = this.props.location.pathname.split("/");
    let id = arr[3];
    if (id !== String(Number(id))) {
      this.setState({
        isInvalid: true,
        shouldRender: true
      });
    } else {
      this.setState({
        shouldRender: true,
        uid: id
      });
    }
    this.props.loadMCQItem(id);
  }

  componentWillUpdate(nextProps, prevStates) {
    if (this.props.isItemLoading) {
      if (nextProps.isItemLoaded) {
        this.setState({
          inputQuestion: nextProps.mcqItem.question,
          inputOption1: nextProps.mcqItem.option1,
          inputOption2: nextProps.mcqItem.option2,
          inputOption3: nextProps.mcqItem.option3,
          inputOption4: nextProps.mcqItem.option4,
          inputAnswer: nextProps.mcqItem.answer,
          inputSummary: nextProps.mcqItem.summary
        });
      }
    }
    if (this.props.isItemUpdating) {
      if (nextProps.isItemUpdated) {
        window.location.replace(`/dashboard/mcq/${this.state.uid}`);
      } else if (nextProps.isItemUpdateFailed) {
        alert("update failed");
      }
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    let data = {
      question: this.state.inputQuestion,
      option1: this.state.inputOption1,
      option2: this.state.inputOption2,
      option3: this.state.inputOption3,
      option4: this.state.inputOption4,
      answer: this.state.inputAnswer,
      summary: this.state.inputSummary
    };
    this.props.updateMCQItem(data, this.state.uid);
  }

  getDetailsView() {
    return (
      <div className="list-group-item mt-4">
        <h6 className="h6 lead">{this.props.mcqItem.question}</h6>
        <p>
          {"a) "}
          {this.props.mcqItem.option1}
        </p>
        <p>
          {"b) "}
          {this.props.mcqItem.option2}
        </p>
        <p>
          {"c) "}
          {this.props.mcqItem.option3}
        </p>
        <p>
          {"d) "}
          {this.props.mcqItem.option4}
        </p>
        <p className="lead">{`Answer : ${this.props.mcqItem.answer}`}</p>
        <p className="mt-2">{this.props.mcqItem.summary}</p>
      </div>
    );
  }

  getLoaderView() {
    return (
      <Layout>
        <Helmet>
          <title>MCQ View</title>
        </Helmet>
        <Loader />
      </Layout>
    );
  }

  getFormView() {
    return (
      <div className="list-group-item">
        <form method="POST" onSubmit={this.handleSubmit}>
          <label className="m-0">Question</label>
          <textarea
            className="form-control mb-2"
            onChange={event => {
              this.setState({ inputQuestion: event.target.value });
            }}
            defaultValue={this.state.inputQuestion}
          />

          <label className="m-0">Option A</label>
          <textarea
            className="form-control mb-2"
            onChange={event => {
              this.setState({ inputOption1: event.target.value });
            }}
            defaultValue={this.state.inputOption1}
          />

          <label className="m-0">Option B</label>
          <textarea
            className="form-control mb-2"
            onChange={event => {
              this.setState({ inputOption2: event.target.value });
            }}
            defaultValue={this.state.inputOption2}
          />

          <label className="m-0">Option C</label>
          <textarea
            className="form-control mb-2"
            onChange={event => {
              this.setState({ inputOption3: event.target.value });
            }}
            defaultValue={this.state.inputOption3}
          />

          <label className="m-0">Option D</label>
          <textarea
            className="form-control mb-2"
            onChange={event => {
              this.setState({ inputOption4: event.target.value });
            }}
            defaultValue={this.state.inputOption4}
          />

          <label className="m-0">Answer</label>
          <select
            className="form-control"
            onChange={event => {
              this.setState({ inputAnswer: event.target.value });
            }}
          >
            <option value="1">Option A</option>
            <option value="2">Option B</option>
            <option value="3">Option C</option>
            <option value="4">Option D</option>
          </select>

          <label className="m-0">Summary</label>
          <textarea
            className="form-control mb-2"
            style={{ minHeight: "200px" }}
            onChange={event => {
              this.setState({ inputSummary: event.target.value });
            }}
            defaultValue={this.state.inputSummary}
          />
          {this.props.isItemUpdating ? (
            <SpinnerButton smallSpin className="btn-primary disabled">
              Updating
            </SpinnerButton>
          ) : (
            <Button
              className="btn-primary"
              type="submit"
              onSubmit={this.handleSubmit}
            >
              Update
            </Button>
          )}
        </form>
      </div>
    );
  }

  getItemView() {
    if (this.props.isItemLoading) {
      return this.getLoaderView();
    }
    return (
      <Layout>
        <Helmet>
          <title>MCQ View</title>
        </Helmet>
        <div className="container-fluid">
          <div className="row flex-center">
            <div className="col-md-8">
              {this.getDetailsView()}
              <div className="mt-4">
                <h4 className="h4 text-center">Update</h4>
                {this.getFormView()}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  render() {
    if (!this.props.isAuthenticated) {
      return <ErrorView />;
    }
    if (!this.props.user || !this.state.shouldRender) {
      return this.getLoaderView();
    }
    if (!this.props.user.account.isStaff) {
      return <ErrorView />;
    }
    return <div>{this.getItemView()}</div>;
  }
}

const mapToMCQItemState = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,

  isItemLoading: state.ques.isItemLoading,
  isItemLoaded: state.ques.isItemLoaded,
  isItemLoadFailed: state.ques.isItemLoadFailed,
  isItemUpdating: state.ques.isItemUpdating,
  isItemUpdated: state.ques.isItemUpdated,
  isItemUpdateFailed: state.ques.isItemUpdateFailed,
  mcqItem: state.ques.mcqItem
});

export default connect(
  mapToMCQItemState,
  { loadMCQItem, updateMCQItem }
)(View);
