import Axios from "../../common/api/axios";
import * as actionTypes from "../../constants/actionTypes";
import * as alertActions from "../actions/alertActions";

import { transformResponse, transformError } from "../../utils/index";

const profileSuccess = response => ({
  type: actionTypes.GET_POSTS,
  payload: transformResponse(response)
});

const profileError = error => ({
  type: actionTypes.POST_ERROR,
  error: transformError(error)
});

export const getPosts = () => async dispatch => {
  try {
    const response = await Axios.get("/api/posts");
    dispatch(profileSuccess(response.data));
  } catch (error) {
    dispatch(profileError(error.data));
  }
};
