import * as actionTypes from "../../constants/actionTypes";
import initialState from "../initialState";

const postState = initialState.get("post");

const postReducer = (state = postState, { type, payload, error }) => {
  switch (type) {
    case actionTypes.GET_POSTS:
      return state.set("posts", payload).set("loading", false);
    case actionTypes.POST_ERROR:
      return state.set("errors", error).set("loading", false);
    default:
      return state;
  }
};

export default postReducer;
