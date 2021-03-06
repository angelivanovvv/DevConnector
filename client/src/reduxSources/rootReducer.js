import { combineReducers } from "redux-immutable";
import { connectRouter } from "connected-react-router/immutable";

import alertReducer from "./reducers/alertReducer";
import modalReducer from "./reducers/modalReducer";
import authReducer from "./reducers/authReducer";
import profileReducer from "./reducers/profileReducer";
import postReducer from "./reducers/postReducer";

const rootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    modal: modalReducer,
    alerts: alertReducer,
    authentication: authReducer,
    profile: profileReducer,
    post: postReducer
  });

export default rootReducer;
