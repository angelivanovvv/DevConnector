import React from "react";
import PropTypes from "prop-types";

const Card = ({ children, className }) => (
  <div className={`card-wrapper box-shadow ${className}`}>{children}</div>
);

Card.propTypes = {
  className: PropTypes.string
};
Card.defaultProps = {
  className: ""
};

export default Card;
