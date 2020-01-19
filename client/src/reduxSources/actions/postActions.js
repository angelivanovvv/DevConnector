import Axios from "../../common/api/axios";

import * as actionTypes from "../../constants/actionTypes";
import * as alertActions from "../actions/alertActions";

import { transformResponse, transformError } from "../../utils/index";

const posts = () => ({
  type: actionTypes.POSTS
});

const post = () => ({
  type: actionTypes.POST
});

const postsSuccess = response => ({
  type: actionTypes.GET_POSTS,
  payload: transformResponse(response)
});

const postSucces = response => ({
  type: actionTypes.GET_POST,
  payload: transformResponse(response)
});

const postError = error => ({
  type: actionTypes.POST_ERROR,
  error: transformError(error)
});

const updateLikeSuccess = (response, id) => ({
  type: actionTypes.UPDATE_LIKE,
  payload: {
    id,
    response: transformResponse(response)
  }
});

const createPostSuccess = response => ({
  type: actionTypes.CREATE_POST,
  payload: transformResponse(response)
});

const deletePostSuccess = id => ({
  type: actionTypes.DELETE_POST,
  payload: { id }
});

const createCommentSuccess = (response, id) => ({
  type: actionTypes.CREATE_COMMENT,
  payload: {
    id,
    response: transformResponse(response)
  }
});

const deleteCommentSuccess = id => ({
  type: actionTypes.DELETE_COMMENT,
  payload: { id }
});

export const getPosts = () => async dispatch => {
  dispatch(posts());
  try {
    const response = await Axios.get("/api/posts");
    dispatch(postsSuccess(response));
  } catch (error) {
    dispatch(postError(error));
  }
};

export const getPostById = id => async dispatch => {
  dispatch(post());
  try {
    const response = await Axios.get(`/api/posts/${id}`);
    dispatch(postSucces(response));
  } catch (error) {
    dispatch(postError(error));
  }
};

export const createPost = formData => async dispatch => {
  try {
    const body = JSON.stringify({ text: formData });
    const response = await Axios.post("/api/posts", body);
    dispatch(createPostSuccess(response));
    dispatch(alertActions.alert("Post Created", "success"));
  } catch (error) {
    dispatch(postError(error));
  }
};

export const deletePost = id => async dispatch => {
  try {
    await Axios.delete(`/api/posts/${id}`);
    dispatch(deletePostSuccess(id));
    dispatch(alertActions.alert("Post Removed", "success"));
  } catch (error) {
    dispatch(postError(error));
  }
};

export const createComment = (id, formData) => async dispatch => {
  try {
    const body = JSON.stringify({ text: formData });
    const response = await Axios.post(`/api/posts/comment/${id}`, body);
    dispatch(createCommentSuccess(response, id));
    dispatch(alertActions.alert("Comment Created", "success"));
  } catch (error) {
    dispatch(postError(error));
  }
};

export const deleteComment = (postId, commentId) => async dispatch => {
  try {
    await Axios.delete(`/api/posts/comment/${postId}/${commentId}`);
    dispatch(deleteCommentSuccess(commentId));
    dispatch(alertActions.alert("Post Removed", "success"));
  } catch (error) {
    dispatch(postError(error));
  }
};

export const addLike = id => async dispatch => {
  try {
    const response = await Axios.put(`/api/posts/like/${id}`);
    dispatch(updateLikeSuccess(response, id));
  } catch (error) {
    dispatch(postError(error));
  }
};

export const removeLike = id => async dispatch => {
  try {
    const response = await Axios.put(`/api/posts/unlike/${id}`);
    dispatch(updateLikeSuccess(response, id));
  } catch (error) {
    dispatch(postError(error));
  }
};
