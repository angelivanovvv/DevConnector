import * as actionTypes from "../../constants/actionTypes";
import initialState from "./../initialState";

const profileState = initialState.get("profile");

const profileReducer = (state = profileState, { type, payload }) => {
  switch (type) {
    case actionTypes.PROFILE:
      return state.set("loading", true);
    case actionTypes.GET_PROFILE:
      return state.set("profile", payload).set("loading", false);
    case actionTypes.UPDATE_PROFILE:
      return state.set("profile", payload).set("loading", false);
    case actionTypes.PROFILE_ERROR:
      return state.set("error", payload).set("loading", false);
    case actionTypes.CLEAR_PROFILE:
      return state
        .set("profile", profileState.get("profile"))
        .set("repos", profileState.get("repos"))
        .set("loading", false);
    default:
      return state;
  }
};

export default profileReducer;
