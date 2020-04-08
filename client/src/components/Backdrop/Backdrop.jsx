import React from "react";
import PropTypes from "prop-types";

const Backdrop = ({ isOpen, clicked }) =>
  isOpen ? <div className="backdrop" onClick={clicked} /> : null;

Backdrop.propTypes = {
  isOpen: PropTypes.bool,
  clicked: PropTypes.func,
};
Backdrop.defaultProps = {
  isOpen: false,
  onClick: () => {},
};

export default Backdrop;
