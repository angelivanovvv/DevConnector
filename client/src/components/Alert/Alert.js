import React from "react";

import { List } from 'immutable';
import PropTypes from "prop-types";
  
const Alert = ({ errors }) => {
  return (
    errors !== null &&
    errors.size > 0 &&
    errors.map(alert => (
      <div key={alert.get('id')} className={`alert alert-${alert.get('alertType')}`}>
        {alert.get('msg')}
      </div>
    ))
  )
}

Alert.propTypes = {
  alerts: PropTypes.instanceOf(List),
};
Alert.defaultProps = {
  alerts: List(),
};

export default Alert;