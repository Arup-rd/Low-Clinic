import React from "react";
import { loadAllSupportMessages } from "../../controller/actions/dashboard";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Loader } from "../../generic/widgets/misc";
import { MDBModal, MDBModalBody } from "mdbreact";
import { Button, SpinnerButton } from "../../generic/widgets/button";
import { Helmet } from "react-helmet";

class MessageItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisibility: false
    };
  }

  toggle = () => () => {
    this.setState({
      modalVisibility: !this.state.modalVisibility
    });
  };

  modalView() {
    return (
      <MDBModal isOpen={this.state.modalVisibility} toggle={this.toggle()}>
        <MDBModalBody>
          <article className="font-weight-bold">{this.props.message}</article>
        </MDBModalBody>
      </MDBModal>
    );
  }

  render() {
    return (
      <tr>
        <td>{this.props.name}</td>
        <td>{this.props.email}</td>
        <td>{this.props.subject}</td>
        <td>
          <Button className="btn-sm btn-dark" onClick={this.toggle()}>
            View
          </Button>
          {this.modalView()}
        </td>
      </tr>
    );
  }
}

class View extends React.Component {
  static propTypes = {
    loadAllSupportMessages: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isLoaded: PropTypes.bool.isRequired,
    isFailed: PropTypes.bool.isRequired,
    isUpdating: PropTypes.bool.isRequired,
    myUsers: PropTypes.array
  };

  constructor(props) {
    super(props);
    this.state = {
      nextPage: 1
    };
  }

  componentDidMount() {
    this.props.loadAllSupportMessages(1);
  }

  componentWillUpdate(nextProps, nextStates) {
    if (this.props.isLoading || this.props.isUpdating) {
      if (nextProps.isLoaded) {
        this.setState({
          nextPage: this.state.nextPage + 1
        });
      }
    }
  }

  loadMore() {
    if (this.props.supportBox.length === 0) {
      return;
    }
    if (this.props.isUpdating) {
      return (
        <SpinnerButton smallSpin className="btn-primary disabled">
          Updating
        </SpinnerButton>
      );
    }
    return (
      <Button
        className="btn-primary"
        onClick={event => {
          this.props.loadAllSupportMessages(this.state.nextPage);
        }}
      >
        Load More
      </Button>
    );
  }

  view() {
    return (
      <div className="table-responsive">
        <table className="table">
          <tbody>
            {this.props.supportBox.map((item, index) => (
              <MessageItem key={index} {...item} />
            ))}
          </tbody>
        </table>
        {this.loadMore()}
      </div>
    );
  }
  render() {
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
          <title>Support Box</title>{" "}
        </Helmet>
        <div>{renderView}</div>
      </div>
    );
  }
}

const mapToloadMessages = state => ({
  isLoading: state.dashboard.isLoading,
  isLoaded: state.dashboard.isLoaded,
  isFailed: state.dashboard.isFailed,
  isUpdating: state.dashboard.isUpdating,
  supportBox: state.dashboard.supportBox
});

export default connect(
  mapToloadMessages,
  { loadAllSupportMessages }
)(View);
