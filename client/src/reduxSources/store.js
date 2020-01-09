import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import thunk from "redux-thunk";
import { routerMiddleware } from "connected-react-router/immutable";
import { fromJS } from "immutable";

import makeRootReducer from "./rootReducer";

const initialState = fromJS({});

const initStore = history =>
  createStore(
    makeRootReducer(history),
    initialState,
    composeWithDevTools(applyMiddleware(thunk, routerMiddleware(history)))
  );

export default initStore;
