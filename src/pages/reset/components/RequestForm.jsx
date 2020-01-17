import React from "react";
import { TextInput } from "../../../generic/widgets/forms";
import { Button, SpinnerButton } from "../../../generic/widgets/button";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { resetRequest } from "../../../controller/actions/reset";

class ResetRequestForm extends React.Component {
  static propTypes = {
    isResetRequesting: PropTypes.bool.isRequired,
    isResetRequestFailed: PropTypes.bool.isRequired,
    isResetRequestSuccess: PropTypes.bool.isRequired,
    resetRequest: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      inputEmail: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.resetRequest(this.state.inputEmail);
  }

  formView() {
    return (
      <div className="list-group-item">
        {this.props.isResetRequestFailed ? (
          <div className="alert alert-danger">
            <center>
              <strong>Invalid Request</strong>
            </center>
          </div>
        ) : (
          <span></span>
        )}
        <form method="POST" onSubmit={this.handleSubmit}>
          <TextInput
            type="email"
            label="Account Email"
            isRequired="true"
            onChange={event => {
              this.setState({ inputEmail: event.target.value });
            }}
          />
          <div className="flex-center">
            {this.props.isResetRequesting ? (
              <SpinnerButton smallSpin className="disabled">
                Requesting
              </SpinnerButton>
            ) : (
              <Button
                type="submit"
                className="btn-green"
                onSubmit={this.handleSubmit}
              >
                Request To Reset
              </Button>
            )}
          </div>
        </form>
      </div>
    );
  }

  render() {
    if (this.props.isResetRequestSuccess) {
      return (
        <p className="display-4 text-center">
          A verification mail sent to your mailbox
        </p>
      );
    }
    return this.formView();
  }
}

const mapToPropState = state => ({
  isResetRequesting: state.reset.isResetRequesting,
  isResetRequestFailed: state.reset.isResetRequestFailed,
  isResetRequestSuccess: state.reset.isResetRequestSuccess
});

export default connect(mapToPropState, { resetRequest })(ResetRequestForm);
