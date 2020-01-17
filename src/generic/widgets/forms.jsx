import React from "react";
import PropTypes from "prop-types";
import style from "./styles/Form.module.css";

const TextInput = props => {
  return (
    <div className={style.textinput}>
      <label>{props.label}</label>
      <input
        className="form-control"
        type={props.type}
        placeholder={props.placeholder}
        onChange={props.onChange}
        value={props.value}
        isrequired={props.isRequired ? props.isRequired : "false"}
      />
    </div>
  );
};
TextInput.propTypes = {
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string
};

const CheckBox = props => {
  return (
    <div className="custom-control custom-checkbox">
      <input
        id={props.id}
        type="checkbox"
        className="custom-control-input"
        onChange={props.onChange}
      />
      <label htmlFor={props.id} className="custom-control-label">
        {props.label}
      </label>
    </div>
  );
};
CheckBox.propTypes = {
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  checked: PropTypes.bool
};

const Select = props => {
  return (
    <div>
      <label>{props.label}</label>
      <select
        onChange={props.onChange}
        className={`form-control ${props.className}`}
        style={{ ...props.style }}
      >
        <option value={null}>...</option>
        {props.options.map(item => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};
Select.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.array
};

const TextArea = props => {
  return (
    <div className={style.textarea}>
      <label>{props.label}</label>
      <textarea
        value={props.value}
        onChange={props.onChange}
        style={{ ...style }}
        className={`form-control ${props.className}`}
        isrequired={props.isrequired}
      ></textarea>
    </div>
  );
};
TextArea.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string.isRequired,
  style: PropTypes.object,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export { TextInput, CheckBox, Select, TextArea };
