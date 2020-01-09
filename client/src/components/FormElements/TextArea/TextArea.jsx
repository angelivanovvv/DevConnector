import React from "react";
import PropTypes from "prop-types";

const TextArea = ({ placeholder, name, className, onChange, rows }) => (
  <textarea
    name={name}
    className={className}
    rows={rows}
    placeholder={placeholder}
    onChange={onChange}
  ></textarea>
);

TextArea.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  rows: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func
};

TextArea.defaultProps = {
  name: "",
  className: "",
  rows: "5",
  placeholder: "default....",
  onChange: () => {}
};

export default TextArea;
