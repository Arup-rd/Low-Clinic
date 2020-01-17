import React, { Component } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardImage,
  MDBCardText
} from "mdbreact";

class CardCarousel extends Component {
  render() {
    const responsive = {
      superLargeDesktop: {
        breakpoint: { max: 4000, min: 1200 },
        items: 4
      },
      desktop: {
        breakpoint: { max: 1200, min: 992 },
        items: 3
      },
      tablet: {
        breakpoint: { max: 992, min: 576 },
        items: 2
      },
      mobile: {
        breakpoint: { max: 576, min: 0 },
        items: 1
      }
    };

    return (
      <div className={this.props.className}>
        <h2 className="text-center mb-5">Team</h2>
        <Carousel
          responsive={responsive}
          infinite={true}
          autoPlay={this.props.deviceType !== "mobile" ? true : false}
          autoPlaySpeed={2500}
        >
          {this.props.team.map(people => (
            <MDBCard className="mx-3 mb-2 hoverable" key={people.name}>
              <MDBCardImage className="img-fluid" src={people.image} waves />
              <MDBCardBody>
                <MDBCardTitle className="text-center">
                  {people.name}
                </MDBCardTitle>
                <MDBCardText>{people.bio}</MDBCardText>
              </MDBCardBody>
            </MDBCard>
          ))}
        </Carousel>
        ;
      </div>
    );
  }
}

export default CardCarousel;
