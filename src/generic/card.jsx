import React, { Component } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBIcon,
  MDBCardHeader,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBContainer
} from "mdbreact";
import "../static/css/generic/card.css";

const OMR = props => {
  return (
    <div className="custom-control custom-checkbox mb-2">
      <input
        type="checkbox"
        className="custom-control-input"
        id={props.id}
        checked={props.checked}
        onChange={props.onClick}
      />
      <label className="custom-control-label" htmlFor={props.id}>
        {props.children}
      </label>
    </div>
  );
};

function HomeCard(props) {
  return (
    <MDBBtn
      rounded
      color="amber"
      className={`mb-3 mt-4 mx-2 btn-block ${props.className}`}
      href={props.url}
      onClick={props.onClick}
      style={props.style}
    >
      <MDBCardBody className="card-background px-lg-4 px-md-2 px-5">
        <div className="d-flex justify-content-center">
          <MDBIcon icon={props.icon} size="5x" style={{ color: "fff" }} />
        </div>
        <div className="p-3 m-3 text-center font-weight-light">
          {props.children}
        </div>
        <h5>{props.name}</h5>
      </MDBCardBody>
    </MDBBtn>
  );
}

function ItemCard(props) {
  return (
    <MDBCol md="3" className="mb-lg-0 mb-4 mt-5">
      <MDBCard className="shadow-box-example z-depth-5">
        <MDBCardBody className="card-background px-5 ">
          <div className="d-flex justify-content-center">
            <MDBIcon icon={props.icon} size="5x" />
          </div>
          <MDBBtn
            rounded
            color="elegant"
            className="mb-3 mt-3 btn-block"
            href={props.url}
          >
            {props.name}
          </MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
}

function DropDownItemCard(props) {
  return (
    <MDBCol md="3" className="mb-lg-0 mb-4 mt-5">
      <MDBCard className="shadow-box-example z-depth-5">
        <MDBCardBody className="card-background px-5 ">
          <div className="d-flex justify-content-center">
            <MDBIcon icon={props.icon} size="5x" />
          </div>
          <p className="text-center h4 mt-2">{props.name}</p>
          <MDBDropdown>
            <MDBDropdownToggle
              caret
              color="elegant"
              className="btn-block mb-3 mt-3"
            >
              Explore
            </MDBDropdownToggle>
            <MDBDropdownMenu basic>
              {props.options.map(item => (
                <MDBDropdownItem key={item.name} href={item.url}>
                  {item.name}
                </MDBDropdownItem>
              ))}
            </MDBDropdownMenu>
          </MDBDropdown>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
}

function FolderCard(props) {
  const url = `/edu/notes/folder?location=${props.subject.selfLoc.id}`;
  return (
    <MDBCol md="3" className="mb-3 mt-3">
      <MDBCard className=" blue lighten-1">
        <MDBCardBody className="card-background px-5 ">
          <p className="h6 white-text">
            <MDBIcon icon="folder" /> Subject
          </p>
          <MDBBtn
            size="lg"
            color="white"
            className="mb-3 mt-3 btn-block shadow-box-example z-depth-4"
            href={url}
          >
            {props.subject.name}
          </MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
}

function MCQCard(props) {
  return (
    <div>
      <MDBCard>
        <MDBCardHeader>
          <div style={{ width: "100%", float: "left" }}>
            <h6>{props.data.mcq.question}</h6>
          </div>
        </MDBCardHeader>
        <MDBCardBody>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6">
                <p>a) {props.data.mcq.option1}</p>
                <p>b) {props.data.mcq.option2}</p>
              </div>
              <div className="col-md-6">
                <p>c) {props.data.mcq.option3}</p>
                <p>d) {props.data.mcq.option4}</p>
              </div>
            </div>
          </div>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
}

class ExamCard extends Component {
  onChoose = option => () => {
    if (this.props.omr.answer !== option)
      this.props.onChange(this.props.data.mcq.uid, option);
    else this.props.onChange(this.props.data.mcq.uid, 0);
  };

  render() {
    return (
      <div>
        <MDBCard>
          <MDBCardHeader>
            <div>
              <h6
                style={{
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  float: "left"
                }}
                className="mt-2"
              >
                {this.props.data.mcq.question}
              </h6>
              <MDBIcon
                icon="exclamation-triangle"
                style={{ float: "right", color: "red" }}
                className="mt-2"
                onClick={this.props.onIssueCreate}
              />
            </div>
          </MDBCardHeader>
          <MDBCardBody>
            <div>
              <OMR
                id={`check1${this.props.data.mcq.uid}`}
                checked={this.props.omr.answer === 1 ? true : false}
                onClick={this.onChoose(1)}
              >
                {this.props.data.mcq.option1}
              </OMR>

              <OMR
                id={`check2${this.props.data.mcq.uid}`}
                checked={this.props.omr.answer === 2 ? true : false}
                onClick={this.onChoose(2)}
              >
                {this.props.data.mcq.option2}
              </OMR>

              <OMR
                id={`check3${this.props.data.mcq.uid}`}
                checked={this.props.omr.answer === 3 ? true : false}
                onClick={this.onChoose(3)}
              >
                {this.props.data.mcq.option3}
              </OMR>

              <OMR
                id={`check4${this.props.data.mcq.uid}`}
                checked={this.props.omr.answer === 4 ? true : false}
                onClick={this.onChoose(4)}
              >
                {this.props.data.mcq.option4}
              </OMR>
            </div>
          </MDBCardBody>
        </MDBCard>
      </div>
    );
  }
}

class ReportCard extends Component {
  state = {};
  render() {
    return (
      <div>
        <MDBCard>
          <MDBCardHeader>
            <div style={{ width: "90%", float: "left" }}>
              <h6
                style={{ fontWeight: "bold", fontSize: "1.1rem" }}
                className="mt-2"
              >
                {this.props.data.mcq.question}
              </h6>
            </div>
          </MDBCardHeader>
          <MDBCardBody>
            <div className="container-fluid">
              <MDBContainer>
                <OMR
                  id={`check1${this.props.data.mcq.uid}`}
                  checked={this.props.omr.answer === 1 ? true : false}
                  onClick={this.onChoose(1)}
                >
                  {this.props.data.mcq.option1}
                </OMR>

                <OMR
                  id={`check2${this.props.data.mcq.uid}`}
                  checked={this.props.omr.answer === 2 ? true : false}
                  onClick={this.onChoose(2)}
                >
                  {this.props.data.mcq.option2}
                </OMR>

                <OMR
                  id={`check3${this.props.data.mcq.uid}`}
                  checked={this.props.omr.answer === 3 ? true : false}
                  onClick={this.onChoose(3)}
                >
                  {this.props.data.mcq.option3}
                </OMR>

                <OMR
                  id={`check4${this.props.data.mcq.uid}`}
                  checked={this.props.omr.answer === 4 ? true : false}
                  onClick={this.onChoose(4)}
                >
                  {this.props.data.mcq.option4}
                </OMR>
              </MDBContainer>
            </div>
          </MDBCardBody>
        </MDBCard>
      </div>
    );
  }
}

export {
  ItemCard,
  FolderCard,
  DropDownItemCard,
  MCQCard,
  HomeCard,
  ExamCard,
  ReportCard
};
