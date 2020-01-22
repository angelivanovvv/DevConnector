import uuid from "uuid";
import * as actionTypes from "../../constants/actionTypes";

const setAlert = (msg, alertType, id) => ({
  type: actionTypes.SET_ALERT,
  payload: { msg, alertType, id }
});

const removeAlert = () => ({
  type: actionTypes.REMOVE_ALERT
});

export const alert = (msg, alertType, timeout = 5000) => dispatch => {
  const id = uuid.v4();
  dispatch(setAlert(msg, alertType, id));
  setTimeout(() => dispatch(removeAlert()), timeout);
};
