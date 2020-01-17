import React from "react";
import style from "./styles/Misc.module.css";
import PropTypes from "prop-types";

const Loader = props => {
  return (
    <div className={style.spinner}>
      <div className={style.bounce1}></div>
      <div className={style.bounce2}></div>
      <div className={style.bounce3}></div>
    </div>
  );
};

const Image = props => {
  return (
    <div
      className={`${style.imageView} ${props.className}`}
      style={{ height: props.height }}
    >
      <img src={props.source} alt={props.alt ? props.alt : "image-view"} />
    </div>
  );
};

Image.prototype = {
  source: PropTypes.string.isRequired,
  alt: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  height: PropTypes.string
};

export { Loader, Image };
