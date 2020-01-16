import React from "react";

import PropTypes from "prop-types";

const Alert = ({ errors }) => {
  return (
    errors !== null &&
    errors.size > 0 &&
    errors.map(alert => (
      <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        {alert.msg}
      </div>
    ))
  );
};

Alert.propTypes = {
  alerts: PropTypes.instanceOf(Object)
};
Alert.defaultProps = {
  alerts: Object()
};

export default Alert;
