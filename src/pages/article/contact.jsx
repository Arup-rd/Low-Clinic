import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from "mdbreact";
import { Layout } from "../../generic/base";
import { Helmet } from "react-helmet";
import { SpinnerButton } from "../../generic/widgets/button";
import { SERVER } from "../../controller/actions/config";
import axios from "axios";

class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      email: null,
      subject: null,
      message: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  isValidForm() {
    if (this.state.name === null) {
      alert("Name required");
      return false;
    }
    if (this.state.subject === null) {
      alert("Subject required");
      return false;
    }
    if (this.state.email === null) {
      alert("Email required");
      return false;
    }
    if (this.state.message === null) {
      alert("Message required");
      return false;
    }
    return true;
  }

  async submitToServer(data) {
    var formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    await axios.post(`${SERVER}/api/cpanel/support/`, formData, {});
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!this.isValidForm()) {
      return;
    }
    const data = {
      name: this.state.name,
      email: this.state.email,
      subject: this.state.subject,
      message: this.state.message
    };
    this.setState({ isSending: true });
    this.submitToServer(data)
      .then(res => {
        alert("Support message sent");
        this.setState({ isSending: false });
      })
      .catch(err => {
        alert("Something went wrong");
        this.setState({ isSending: false });
      });
  }

  getFormButton() {
    if (this.state.isSending) {
      return (
        <SpinnerButton smallSpin className="btn-sm btn-primary disabled">
          Sending
        </SpinnerButton>
      );
    }
    return (
      <MDBBtn
        color="primary"
        type="submit"
        onSubmit={this.handleSubmit}
        size="md"
      >
        Send
      </MDBBtn>
    );
  }

  formView() {
    return (
      <form method="POST" onSubmit={this.handleSubmit}>
        <MDBRow>
          <MDBCol md="6">
            <div className="md-form mb-0">
              <MDBInput
                type="text"
                id="contact-name"
                label="Your name"
                onChange={event => {
                  this.setState({ name: event.target.value });
                }}
                isrequired="true"
              />
            </div>
          </MDBCol>
          <MDBCol md="6">
            <div className="md-form mb-0">
              <MDBInput
                type="text"
                id="contact-email"
                label="Your email"
                onChange={event => {
                  this.setState({ email: event.target.value });
                }}
              />
            </div>
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol md="12">
            <div className="md-form mb-0">
              <MDBInput
                type="text"
                id="contact-subject"
                label="Subject"
                onChange={event => {
                  this.setState({ subject: event.target.value });
                }}
              />
            </div>
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol md="12">
            <div className="md-form mb-0">
              <MDBInput
                type="textarea"
                id="contact-message"
                label="Your message"
                onChange={event => {
                  this.setState({ message: event.target.value });
                }}
              />
            </div>
          </MDBCol>
        </MDBRow>
        <div className="text-center text-md-left">{this.getFormButton()}</div>
      </form>
    );
  }

  render() {
    return (
      <Layout>
        <Helmet>
          <title>Contact Us</title>
        </Helmet>
        <MDBContainer className="mt-5">
          <h2 className="h1-responsive font-weight-bold text-center mt-5 mb-3">
            Contact us
          </h2>
          <MDBRow>
            <MDBCol md="5" className="md-0 mb-5 mx-auto list-group-item">
              {this.formView()}
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </Layout>
    );
  }
}

export default ContactForm;
