import React, { Component } from "react";

import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBIcon,
  MDBBtn,
  MDBModal,
  MDBModalHeader,
  MDBModalBody
} from "mdbreact";

class MCQItemViewTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisibility: false,
      issueText: "",
      ...props
    };
    this.listener = this.listener.bind(this);

    props.connector(this.listener);
  }

  toggle = () => () => {
    this.setState({
      modalVisibility: !this.state.modalVisibility,
      issueText: ""
    });
  };

  listener(updates) {
    console.log(updates);
    this.setState({
      data: updates
    });
    this.setState({ modalVisibility: false });
  }

  report() {
    return (
      <div
        style={{
          width: "30px",
          height: "30px",
          float: "right",
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          cursor: "pointer",

          padding: "10px"
        }}
      >
        <MDBIcon icon={this.state.data.icon} onClick={this.toggle()} />
        <MDBModal
          isOpen={this.state.modalVisibility}
          toggle={this.toggle()}
          center
          className="text-dark"
          // size="lg"
        >
          <MDBModalHeader toggle={this.toggle()}>Update MCQ</MDBModalHeader>
          <MDBModalBody>{this.props.children}</MDBModalBody>
        </MDBModal>
      </div>
    );
  }

  render() {
    let answer = "No Answer";
    switch (this.state.data.answer) {
      case 1:
        answer = `a) ${this.state.data.option1}`;
        break;
      case 2:
        answer = `b) ${this.state.data.option2}`;
        break;
      case 3:
        answer = `c) ${this.state.data.option3}`;
        break;
      case 4:
        answer = `d) ${this.state.option4}`;
        break;
      default:
        break;
    }
    return (
      <MDBCard className="mb-2">
        <MDBCardHeader>
          <div style={{ width: "90%", float: "left" }}>
            <h5>{this.state.data.question}</h5>
          </div>
          {this.report()}
        </MDBCardHeader>
        <MDBCardBody>
          <div className="container-fluid">
            <div className="row">
              <div className="col-auto">a) {this.state.data.option1}</div>
              <div className="col-auto">b) {this.state.data.option2}</div>
              <div className="col-auto">c) {this.state.data.option3}</div>
              <div className="col-auto">d) {this.state.data.option4}</div>
            </div>
          </div>
          <blockquote className="blockquote bq-primary mt-3">
            <h6 className="text-primary">{answer}</h6>
            <p className="lead">{this.state.data.summary}</p>
          </blockquote>
          <div className="mt-2">
            Tags:
            <MDBBtn
              style={{ borderRadius: "15px" }}
              className="btn-sm btn-blue"
              href="#1"
            >
              folder-1
            </MDBBtn>
            <MDBBtn
              style={{ borderRadius: "15px" }}
              className="btn-sm btn-blue"
              href="#1"
            >
              folder-2
            </MDBBtn>
          </div>
        </MDBCardBody>
      </MDBCard>
    );
  }
}

export { MCQItemViewTest };
