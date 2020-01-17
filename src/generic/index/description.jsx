import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";

import LawEduThumb from "../../static/img/askRiashad icon Study Support.png";
import TexThumb from "../../static/img/askRiashad icon Incometax.png";
import LawSupprtThumb from "../../static/img/askRiashad icon Legal Support.png";

class Description extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <MDBContainer className="my-5">
        <MDBRow className="p-5">
          <MDBCol
            md="5"
            className="d-flex flex-column align-items-end justify-content-center pr-md-5"
          >
            <img
              src={LawEduThumb}
              className="img-fluid py-3"
              alt="Feature"
              width="200"
            />
          </MDBCol>
          <MDBCol
            md="5"
            className="d-flex flex-column align-items-start justify-content-center pl-md-5"
          >
            <h2 className="text-warning py-2">আইন শিক্ষা</h2>
            <div className="text-justify">
              <p className="m-0">
                দেশের সেরা বিশ্ববিদ্যালয়ের সেরা শিক্ষকদের নোটস, লেকচার, গাইড{" "}
              </p>
              <p className="m-0">
                পৃথিবীর সর্ববৃহৎ বাংলাদেশী আইনের এমসিকিউ প্রশ্ন ব্যাংক{" "}
              </p>
              <p className="m-0">রচনামূলক প্রশ্ন ব্যাংক, এবং উত্তর </p>
              <p className="m-0">
                আনলিমিটেড বিষয় ভিত্তিক, কিংবা চ্যাপ্টার ভিত্তিক মডেল টেস্ট
              </p>
              <p className="m-0">
                রিভিশনের উন্নতি মনিটর করার জন্য আকর্ষণীয় ইনফোগ্রাফিক গাইড{" "}
              </p>
            </div>
          </MDBCol>
        </MDBRow>

        <MDBRow className="p-5">
          <MDBCol
            md="6"
            className="d-flex flex-column align-items-end justify-content-center pr-md-5 text-md-right"
          >
            <h2 className="text-warning py-2">আয়কর রিটার্ন </h2>
            <div className="text-justify text-right">
              <p className="m-0">
                পূর্ণাঙ্গ আয়কর প্রস্তুত, হিসাব ও দাখিল করার সফটওয়্যার{" "}
              </p>
              <p className="m-0">
                ঝামেলাহীন স্বয়ংক্রিয় ভাবে প্রদেয় ট্যাক্স নির্ণয়
              </p>
              <p className="m-0">পূর্ববর্তী আয়কর বছরের তথ্য সংরক্ষণ </p>
              <p className="m-0">
                ব্যাক্তি, প্রতিষ্ঠান বা আয়কর আইনজীবী সকলের জন্য আনলিমিটেড এক্সেস
              </p>
            </div>
          </MDBCol>
          <MDBCol
            md="5"
            className="d-flex flex-column align-items-start justify-content-center pl-md-5"
          >
            <img
              src={TexThumb}
              className="img-fluid py-3"
              alt="Feature"
              width="200"
            />
          </MDBCol>
        </MDBRow>

        <MDBRow className="p-5">
          <MDBCol
            md="5"
            className="d-flex flex-column align-items-end justify-content-center pr-md-5"
          >
            <img
              src={LawSupprtThumb}
              className="img-fluid py-3"
              alt="Feature"
              width="200"
            />
          </MDBCol>
          <MDBCol
            md="5"
            className="d-flex flex-column align-items-start justify-content-center pl-md-5"
          >
            <h2 className="text-warning py-2">আইনী পরামর্শ </h2>
            <div className="text-justify ">
              <p className="m-0">
                পৃথিবীর সর্ব বৃহৎ বাংলাদেশি ফৌজদারি ও দেওয়ানি মামলা সংক্রান্ত
                ড্রাফট ব্যাংক
              </p>
              <p className="m-0">বিভিন্ন দলিল সম্পাদনের স্বয়ংক্রিয় সফটওয়্যার</p>
              <p className="m-0">
                দেশের বিভিন্ন শহরে থাকা আইনজীবীদের মাধ্যমে আইনী পরামর্শ
              </p>
              <p className="m-0">
                আইনজীবী বা সাধারণ ব্যাক্তিদের জন্য সিভিল অথবা ক্রিমিনাল ড্রাফটিং
                এর অসংখ্য নমুনা
              </p>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default Description;
