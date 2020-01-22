import React from "react";
import PropTypes from "prop-types";

const Backdrop = ({ show, clicked }) =>
  show ? <div className="backdrop" onClick={clicked} /> : null;

Backdrop.propTypes = {
  show: PropTypes.bool,
  clicked: PropTypes.func
};
Backdrop.defaultProps = {
  show: false,
  onClick: () => {}
};

export default Backdrop;
