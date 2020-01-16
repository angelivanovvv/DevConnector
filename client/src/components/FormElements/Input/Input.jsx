import React from "react";
import PropTypes from "prop-types";

const Input = ({
  type,
  placeholder,
  name,
  value,
  onChange,
  onClick,
  className,
  disabled
}) => (
  <input
    className={className}
    type={type}
    placeholder={placeholder}
    name={name}
    value={value ? value : ""}
    onChange={onChange}
    onClick={onClick}
    disabled={disabled}
  />
);

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool
};
Input.defaulProps = {
  type: "input",
  placeholder: "placeholder",
  name: "",
  value: "",
  onChange: () => {},
  onClick: () => {},
  className: "",
  disabled: false
};

export default Input;
