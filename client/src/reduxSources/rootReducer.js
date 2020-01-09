// import { combineReducers } from "redux";
import { combineReducers } from "redux-immutable";
import { connectRouter } from "connected-react-router/immutable";

import alertsReducer from "./reducers/alertsReducer";
import authReducer from "./reducers/authReducer";
import profileReducer from "./reducers/profileReducer";

const rootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    alerts: alertsReducer,
    authentication: authReducer,
    profile: profileReducer
  });

export default rootReducer;
