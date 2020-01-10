import Axios from "../../common/api/axios";

import * as actionTypes from "../../constants/actionTypes";
import * as alertActions from "../actions/alertActions";

import { ROUTES_ACTIONS } from "../../constants/clientRoutes";
import { transformResponse, transformError } from "../../utils/index";

const profile = () => ({
  type: actionTypes.PROFILE
});
const profileSuccess = response => ({
  type: actionTypes.GET_PROFILE,
  payload: transformResponse(response)
});
const profileUpdateSuccess = response => ({
  type: actionTypes.UPDATE_PROFILE,
  payload: transformResponse(response)
});
const profileError = error => ({
  type: actionTypes.PROFILE_ERROR,
  error: transformError(error)
});

const profileDelete = () => ({
  type: actionTypes.DELETE_PROFILE
});

export const clearProfile = () => ({
  type: actionTypes.CLEAR_PROFILE
});

export const getProfile = () => {
  return async dispatch => {
    dispatch(profile());
    try {
      const response = await Axios.get("/api/profile/me");
      dispatch(profileSuccess(response.data));
    } catch (error) {
      dispatch(profileError(error));
    }
  };
};

export const createProfile = (formData, edit = false) => {
  return async dispatch => {
    dispatch(profile());
    let alertMessage = edit ? "Profile Updated" : "Profile Created";
    try {
      const response = await Axios.post("/api/profile", formData);
      dispatch(profileSuccess(response.data));
      dispatch(alertActions.alert(alertMessage, "success"));
      dispatch(ROUTES_ACTIONS.toDashboard());
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors)
        errors.forEach(error =>
          dispatch(alertActions.alert(error.msg, "danger"))
        );
      dispatch(profileError(error));
    }
  };
};

export const deleteProfile = () => {
  return async dispatch => {
    try {
      const response = await Axios.delete("/api/profile");
      dispatch(clearProfile());
      dispatch(profileDelete());
      dispatch(
        alertActions.alert("Your accont has been permananly deleted", "danger")
      );
    } catch (error) {
      dispatch(profileError(error));
    }
  };
};

export const addExperience = formData => {
  return async dispatch => {
    const alertMessage = "Experience Added";
    try {
      const response = await Axios.put("/api/profile/experience", formData);
      dispatch(profileUpdateSuccess(response.data));
      dispatch(alertActions.alert(alertMessage, "success"));
      dispatch(ROUTES_ACTIONS.toDashboard());
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors)
        errors.forEach(error =>
          dispatch(alertActions.alert(error.msg, "danger"))
        );
      dispatch(profileError(error));
    }
  };
};

export const deleteExperience = id => {
  return async dispatch => {
    const alertmessage = "Experience Deleted";
    try {
      const response = await Axios.delete(`/api/profile/experience/${id}`);
      dispatch(profileUpdateSuccess(response.data));
      dispatch(alertActions.alert(alertmessage, "success"));
    } catch (error) {
      dispatch(profileError(error));
    }
  };
};

export const addEducation = formData => {
  return async dispatch => {
    const alertMessage = "Education Added";
    try {
      const response = await Axios.put("/api/profile/education", formData);
      dispatch(profileUpdateSuccess(response.data));
      dispatch(alertActions.alert(alertMessage, "success"));
      dispatch(ROUTES_ACTIONS.toDashboard());
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors)
        errors.forEach(error =>
          dispatch(alertActions.alert(error.msg, "danger"))
        );
      dispatch(profileError(error));
    }
  };
};

export const deleteEducation = id => {
  return async dispatch => {
    const alertmessage = "Education Deleted";
    try {
      const response = await Axios.delete(`/api/profile/education/${id}`);
      dispatch(profileUpdateSuccess(response.data));
      dispatch(alertActions.alert(alertmessage, "success"));
    } catch (error) {
      dispatch(profileError(error));
    }
  };
};
