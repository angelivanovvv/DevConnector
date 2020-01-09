import React from "react";
import { List } from "immutable";
import PropTypes from "prop-types";

const Select = ({ name, value, className, onChange, options }) => (
  <select name={name} className={className} value={value} onChange={onChange}>
    {options.map(option => (
      <option key={option.get("key")} value={option.get("value")}>
        {option.get("name")}
      </option>
    ))}
  </select>
);

Select.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.instanceOf(List).isRequired
};

Select.defaultProps = {
  name: "",
  value: "",
  className: "",
  onChange: () => {}
};

export default Select;
