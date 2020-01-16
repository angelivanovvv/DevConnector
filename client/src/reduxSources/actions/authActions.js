import Axios from "../../common/api/axios";

import * as actionTypes from "../../constants/actionTypes";
import * as alertsActions from "./alertActions";
import * as profileActions from "./profileActions";

import { LocalStorage } from "../../common/helpers";

import {
  transformResponse,
  transformError,
  setAuthToken
} from "../../utils/index";

import { ROUTES_ACTIONS } from "../../constants/clientRoutes";

export const unAutorized = () => ({
  type: actionTypes.UNAUTORIZED
});

export const loadUser = () => {
  const userLoaded = response => ({
    type: actionTypes.USER_LOADED,
    payload: transformResponse(response)
  });
  const authError = error => ({
    type: actionTypes.AUTH_ERROR,
    error: transformError(error)
  });
  return async dispatch => {
    if (LocalStorage.get("token")) setAuthToken(LocalStorage.get("token"));
    try {
      const response = await Axios.get("/api/auth");
      dispatch(userLoaded(response));
    } catch (error) {
      dispatch(authError(error));
    }
  };
};

export const register = ({ name, email, password }) => {
  const registerSuccess = response => ({
    type: actionTypes.REGISTER_SUCCESS,
    payload: transformResponse(response)
  });
  const registerFail = () => ({
    type: actionTypes.REGISTER_FAIL
  });
  return async dispatch => {
    const body = JSON.stringify({ name, email, password });
    try {
      const response = await Axios.post("/api/users", body);
      dispatch(registerSuccess(response));
      dispatch(loadUser());
      dispatch(ROUTES_ACTIONS.toDashboard());
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors)
        errors.forEach(error =>
          dispatch(alertsActions.alert(error.msg, "danger"))
        );
      dispatch(registerFail());
    }
  };
};

export const login = (email, password) => {
  const loginSuccess = response => ({
    type: actionTypes.LOGIN_SUCCESS,
    payload: transformResponse(response)
  });
  const loginFail = () => ({
    type: actionTypes.LOGIN_FAIL
  });
  return async dispatch => {
    const body = JSON.stringify({ email, password });
    try {
      const response = await Axios.post("/api/auth", body);
      dispatch(loginSuccess(response));
      dispatch(loadUser());
      dispatch(ROUTES_ACTIONS.toDashboard());
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors)
        errors.forEach(error =>
          dispatch(alertsActions.alert(error.msg, "danger"))
        );
      dispatch(loginFail());
    }
  };
};

export const logout = () => {
  const logout = () => ({
    type: actionTypes.LOGOUT
  });
  return dispatch => {
    dispatch(logout());
    dispatch(profileActions.clearProfile());
    dispatch(ROUTES_ACTIONS.toLogout());
  };
};
