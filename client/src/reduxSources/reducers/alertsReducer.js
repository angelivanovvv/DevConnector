import * as alertTypes from "../../constants/actionTypes";
import initialState from '../initialState';

const alertState = initialState.get('alerts');

const alertsReducer = (state = alertState, { type, payload }) => {
  switch (type) {
    case alertTypes.SET_ALERT:
      return state.update('errors', errors => {
        return errors.push(payload)
      });
    case alertTypes.REMOVE_ALERT:
      return state.set('errors', alertState.get('errors'));
    default:
      return state;
  }
};

export default alertsReducer;
