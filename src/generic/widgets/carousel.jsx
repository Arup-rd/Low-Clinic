import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import css from "./styles/Carousel.module.css";
import { MDBIcon } from "mdbreact";

const SliderNextArrow = props => {
  const { onClick, style } = props;
  return (
    <div className={css.next} style={{ ...style }} onClick={onClick}>
      <MDBIcon className={css.arrowIcon} icon="chevron-right" />
    </div>
  );
};

const SliderPrevArrow = props => {
  const { onClick, style } = props;
  return (
    <div className={css.prev} style={{ ...style }} onClick={onClick}>
      <MDBIcon className={css.arrowIcon} icon="chevron-left" />
    </div>
  );
};

const MultiItemCarousel = props => {
  const settings = {
    className: "slider variable-width",
    dots: false,
    infinite: true,
    centerMode: true,
    variableWidth: true,
    arrows: true,
    swipeToSlide: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SliderNextArrow />,
    prevArrow: <SliderPrevArrow />
  };
  return (
    <div
      className={`${css.sliderContainer} ${props.className}`}
      style={{ ...props.style }}
    >
      <Slider {...settings}>{props.children}</Slider>
    </div>
  );
};

const SingleItemCarousel = props => {
  const settings = {
    slidesToShow: 1,
    nextArrow: <SliderNextArrow />,
    prevArrow: <SliderPrevArrow />
  };

  return (
    <div stlyle={{ ...props.stlyle }}>
      <Slider {...settings}>{props.children}</Slider>
    </div>
  );
};

export { MultiItemCarousel, SingleItemCarousel };
