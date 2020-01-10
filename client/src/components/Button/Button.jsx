import React from "react";
import PropTypes from "prop-types";

const Button = ({ name, type, disabled, className, children, onClick }) => (
  <button
    type={type}
    name={name}
    className={className}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

Button.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  onClick: PropTypes.func,
  disabled: PropTypes.bool
};

Button.defaultProps = {
  name: "",
  type: "button",
  className: "",
  children: "",
  onClick: () => {},
  disabled: false
};

export default Button;
