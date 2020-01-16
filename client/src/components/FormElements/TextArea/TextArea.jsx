import React from "react";
import PropTypes from "prop-types";

const TextArea = ({ placeholder, name, className, onChange, rows, value }) => (
  <textarea
    name={name}
    className={className}
    rows={rows}
    placeholder={placeholder}
    onChange={onChange}
    value={value ? value : ""}
  ></textarea>
);

TextArea.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.string,
  rows: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func
};

TextArea.defaultProps = {
  value: "",
  name: "",
  className: "",
  rows: "5",
  placeholder: "default....",
  onChange: () => {}
};

export default TextArea;
