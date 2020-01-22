import React from "react";
import PropTypes from "prop-types";

const Modal = ({ show, children }) => {
  return (
    <div
      className="modal"
      style={{
        transform: show ? "translateY(0)" : "translateY(-100vh)",
        opacity: show ? "1" : "0"
      }}
    >
      {children}
    </div>
  );
};

Modal.propTypes = {
  show: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.any
  ])
};
Modal.defaultProps = {
  show: false,
  children: ""
};

export default Modal;
