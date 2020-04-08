import Axios from "../../common/api/axios";

import * as actionTypes from "../../constants/actionTypes";
import * as alertActions from "../actions/alertActions";
import * as modalActions from "../actions/modalActions";

import { ROUTES_ACTIONS } from "../../constants/clientRoutes";
import { transformResponse, transformError } from "../../utils/index";

const { alert } = alertActions;
const { closeModal } = modalActions;
const { toDashboard } = ROUTES_ACTIONS;

const profile = () => ({
  type: actionTypes.PROFILE,
});
const profileSuccess = (response) => ({
  type: actionTypes.GET_PROFILE,
  payload: transformResponse(response),
});
const profilesSuccess = (response) => ({
  type: actionTypes.GET_PROFILES,
  payload: transformResponse(response),
});
const profileUpdateSuccess = (response) => ({
  type: actionTypes.UPDATE_PROFILE,
  payload: transformResponse(response),
});
const profileError = (error) => ({
  type: actionTypes.PROFILE_ERROR,
  error: transformError(error),
});
const profileDelete = () => ({
  type: actionTypes.DELETE_PROFILE,
});
const githubSuccess = (response) => ({
  type: actionTypes.GET_GITHUB_REPOS,
  payload: transformResponse(response),
});

export const getProfile = () => async (dispatch) => {
  dispatch(profile());
  try {
    const response = await Axios.get("/api/profile/me");
    dispatch(profileSuccess(response));
  } catch (error) {
    dispatch(clearProfile());
    dispatch(profileError(error));
  }
};

export const getProfiles = () => async (dispatch) => {
  dispatch(clearProfile());
  try {
    const response = await Axios.get("/api/profile");
    dispatch(profilesSuccess(response));
  } catch (error) {
    dispatch(profileError(error));
  }
};

export const getProfileById = (userId) => async (dispatch) => {
  try {
    const response = await Axios.get(`/api/profile/user/${userId}`);
    dispatch(profileSuccess(response));
  } catch (error) {
    dispatch(profileError(error));
  }
};

export const getGithubRepos = (username) => async (dispatch) => {
  try {
    const response = await Axios.get(`/api/profile/github/${username}`);
    dispatch(githubSuccess(response));
  } catch (error) {
    dispatch(profileError(error));
  }
};

export const createProfile = (formData, edit = false) => async (dispatch) => {
  dispatch(profile());
  let alertMessage = edit ? "Profile Updated" : "Profile Created";

  try {
    const response = await Axios.post("/api/profile", formData);
    dispatch(profileSuccess(response));
    dispatch(alert(alertMessage, "success"));
    dispatch(toDashboard());
  } catch (error) {
    const errors = error?.response?.data?.errors;
    if (errors) errors.forEach((error) => dispatch(alert(error.msg, "danger")));
    dispatch(profileError(error));
  }
};

export const deleteProfile = () => async (dispatch) => {
  try {
    await Axios.delete("/api/profile");
    dispatch(profileDelete());
    dispatch(clearProfile());
    dispatch(closeModal());
    dispatch({ type: actionTypes.LOGOUT });
    dispatch(alert("Your accont has been permananly deleted", "danger"));
  } catch (error) {
    dispatch(profileError(error));
  }
};

export const clearProfile = () => ({
  type: actionTypes.CLEAR_PROFILE,
});

export const addExperience = (formData) => async (dispatch) => {
  const alertMessage = "Experience Added";
  try {
    const response = await Axios.put("/api/profile/experience", formData);
    dispatch(profileUpdateSuccess(response));
    dispatch(alert(alertMessage, "success"));
    dispatch(toDashboard());
  } catch (error) {
    const errors = error?.response?.data?.errors;
    if (errors) errors.forEach((error) => dispatch(alert(error.msg, "danger")));
    dispatch(profileError(error));
  }
};

export const deleteExperience = (id) => async (dispatch) => {
  const alertmessage = "Experience Deleted";
  try {
    const response = await Axios.delete(`/api/profile/experience/${id}`);
    dispatch(profileUpdateSuccess(response));
    dispatch(alert(alertmessage, "success"));
  } catch (error) {
    dispatch(profileError(error));
  }
};

export const addEducation = (formData) => async (dispatch) => {
  const alertMessage = "Education Added";
  try {
    const response = await Axios.put("/api/profile/education", formData);
    dispatch(profileUpdateSuccess(response));
    dispatch(alert(alertMessage, "success"));
    dispatch(toDashboard());
  } catch (error) {
    const errors = error?.response?.data?.errors;
    if (errors) errors.forEach((error) => dispatch(alert(error.msg, "danger")));
    dispatch(profileError(error));
  }
};

export const deleteEducation = (id) => async (dispatch) => {
  const alertmessage = "Education Deleted";
  try {
    const response = await Axios.delete(`/api/profile/education/${id}`);
    dispatch(profileUpdateSuccess(response));
    dispatch(alert(alertmessage, "success"));
  } catch (error) {
    dispatch(profileError(error));
  }
};
