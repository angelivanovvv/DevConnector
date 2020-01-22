import * as actionTypes from "../../constants/actionTypes";
import initialState from "../initialState";

const modalState = initialState.get("modal");

const modalReducer = (state = modalState, { type, payload }) => {
  switch (type) {
    case actionTypes.OPEN_MODAL:
      return state.set("isOpen", true);
    case actionTypes.CLOSE_MODAL:
      return state.set("isOpen", false);
    default:
      return state;
  }
};

export default modalReducer;
