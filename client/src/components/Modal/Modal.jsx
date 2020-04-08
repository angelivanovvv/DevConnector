import React from "react";
import PropTypes from "prop-types";

import Spinner from "../Spinner";

const Modal = ({ isOpen, isLoading, children }) => {
  return (
    <div
      className="modal"
      style={{
        transform: isOpen ? "translateY(0)" : "translateY(-100vh)",
        opacity: isOpen ? "1" : "0",
      }}
    >
      {isLoading ? children : <Spinner />}
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.any,
  ]),
};
Modal.defaultProps = {
  children: "",
  isLoading: false,
};

export default Modal;
