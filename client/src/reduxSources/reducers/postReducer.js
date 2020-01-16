import * as actionTypes from "../../constants/actionTypes";
import initialState from "../initialState";

const postState = initialState.get("post");

const postReducer = (state = postState, { type, payload, error }) => {
  switch (type) {
    case actionTypes.GET_POSTS:
      return state.set("posts", payload).set("loading", false);
    case actionTypes.POST_ERROR:
      return state.set("errors", error).set("loading", false);
    case actionTypes.CREATE_POST:
      return state.update("posts", posts => posts.unshift(payload));
    case actionTypes.DELETE_POST:
      return state
        .update("posts", posts =>
          posts.filter(post => post.get("_id") !== payload.id)
        )
        .set("loading", false);
    case actionTypes.UPDATE_LIKE:
      return state
        .update("posts", posts =>
          posts.map(post =>
            post.get("_id") === payload.id
              ? post.set("likes", payload.response)
              : post
          )
        )
        .set("loading", false);
    default:
      return state;
  }
};

export default postReducer;
