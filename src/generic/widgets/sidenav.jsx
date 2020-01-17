import React from "react";
import style from "./styles/Sidenav.module.css";
import { RoundButton } from "./button";
import { MDBIcon } from "mdbreact";
import PropTypes from "prop-types";

const SideNavItem = props => {
  return (
    <a
      className={`${props.active ? style.active : ""}`}
      href={props.url}
      style={{ ...props.style }}
    >
      {props.text}
    </a>
  );
};

SideNavItem.prototype = {
  url: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  style: PropTypes.object
};

class SideNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: !window.matchMedia("(max-width:700px)").matches
    };
  }

  render() {
    return (
      <div>
        <div
          className={style.sidebar}
          style={{ width: this.state.visibility ? "200px" : "0px" }}
        >
          {this.props.children}
        </div>

        <div className={style.toggler}>
          <RoundButton
            style={{
              fontSize: "18px",
              color: "white",
              backgroundColor: "black"
            }}
            onClick={event => {
              this.setState({ visibility: !this.state.visibility });
            }}
          >
            <MDBIcon icon="layer-group" />
          </RoundButton>
        </div>
      </div>
    );
  }
}

const SideNavContent = props => {
  return <div className={style.sidebarContent}>{props.children}</div>;
};

export { SideNav, SideNavItem, SideNavContent };
