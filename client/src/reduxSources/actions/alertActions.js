import uuid from "uuid";
import * as alertTypes from "../../constants/actionTypes";
import { transformResponse } from "../../utils/index";

const setAlert = (msg, alertType, id) => ({
  type: alertTypes.SET_ALERT,
  payload: { msg, alertType, id }
});

const removeAlert = () => ({
  type: alertTypes.REMOVE_ALERT
});

export const alert = (msg, alertType, timeout = 5000) => dispatch => {
  const id = uuid.v4();
  dispatch(setAlert(msg, alertType, id));
  setTimeout(() => dispatch(removeAlert()), timeout);
};
