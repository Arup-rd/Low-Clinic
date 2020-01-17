import React from "react";
import {
  MDBBtn,
  MDBModal,
  MDBIcon,
  MDBModalBody,
  MDBModalHeader
} from "mdbreact";

class AddPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: false
    };
    this.modelVisibility = this.modelVisibility.bind(this);
    props.modelController(this.modelVisibility);
  }

  toggle = () => () => {
    this.setState({
      visibility: !this.state.visibility
    });
  };

  modelVisibility(visibility) {
    this.setState({ visibility: visibility });
  }

  render() {
    return (
      <div>
        <MDBBtn
          className="hoverable btn-sm btn-primary"
          onClick={this.toggle()}
        >
          <MDBIcon icon="plus" /> Add Content
        </MDBBtn>
        <MDBModal
          isOpen={this.state.visibility}
          toggle={this.toggle()}
          fullHeight
          position="bottom"
        >
          <MDBModalHeader toggle={this.toggle()}>Add Content</MDBModalHeader>
          <MDBModalBody>
            <div className="d-flex justify-content-center">
              <div className="col-md-8">{this.props.children}</div>
            </div>
          </MDBModalBody>
        </MDBModal>
      </div>
    );
  }
}

class AddFolder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: false
    };
    this.modelVisibility = this.modelVisibility.bind(this);
    props.addFolderController(this.modelVisibility);
  }

  toggle = () => () => {
    this.setState({
      visibility: !this.state.visibility
    });
  };

  modelVisibility(visibility) {
    this.setState({ visibility: visibility });
  }

  render() {
    return (
      <div>
        <MDBBtn
          color="info"
          floating
          className="hoverable flex-center"
          onClick={this.toggle()}
          style={{
            fontSize: 20,
            width: "70px",
            height: "70px",
            borderRadius: "50%",
            position: "fixed",
            bottom: "20px",
            right: "20px"
          }}
        >
          <MDBIcon icon="plus" />
        </MDBBtn>
        <MDBModal isOpen={this.state.visibility} toggle={this.toggle()} center>
          <MDBModalHeader toggle={this.toggle()}>
            {this.props.header}
          </MDBModalHeader>
          <MDBModalBody>
            <div className="d-flex justify-content-center">
              <div className="col-md-8">{this.props.children}</div>
            </div>
          </MDBModalBody>
        </MDBModal>
      </div>
    );
  }
}

export { AddFolder, AddPost };
