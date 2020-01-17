import React from "react";
import PropTypes from "prop-types";

class Button extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    onClick: PropTypes.func,
    onSubmit: PropTypes.func,
    disabled: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let className = "btn";
    if (this.props.disabled) {
      className = `${className} disabled`;
    }
    return (
      <button
        className={`${className} ${this.props.className}`}
        style={{ ...this.props.style }}
        onClick={this.props.onClick}
        onSubmit={this.props.onSubmit}
        type={this.props.type}
      >
        {this.props.children}
      </button>
    );
  }
}

class SpinnerButton extends Button {
  static propTypes = {
    smallSpin: PropTypes.bool,
    spinType: PropTypes.string
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  config() {
    let className = "spinner-border";
    if (this.props.spinType) {
      if (this.props.spinType === "grow") {
        className = "spinner-grow";
        if (this.props.smallSpin) {
          className = `${className} spinner-grow-sm`;
        }
      } else {
        if (this.props.smallSpin) {
          className = `${className} spinner-border-sm`;
        }
      }
    } else {
      if (this.props.smallSpin) {
        className = `${className} spinner-border-sm`;
      }
    }
    return className;
  }

  render() {
    const className = this.config();
    return (
      <Button
        className={`${this.props.className}`}
        style={{ ...this.props.style }}
        onClick={this.props.onClick}
        onSubmit={this.props.onSubmit}
      >
        <div className={className}></div>
        {this.props.children}
      </Button>
    );
  }
}

class RoundButton extends Button {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Button
        className={`${this.props.className}`}
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          padding: "2px",
          ...this.props.style
        }}
        onClick={this.props.onClick}
        onSubmit={this.props.onSubmit}
        disabled={this.props.disabled}
      >
        {this.props.children}
      </Button>
    );
  }
}

export { Button, SpinnerButton, RoundButton };
