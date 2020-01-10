import React, { useEffect } from "react";
import { ConnectedRouter } from "connected-react-router/immutable";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";

import initStore from "./reduxSources/store";
import { setAuthToken } from "./utils/index";
import { LocalStorage } from "./common/helpers";
import * as authActions from "./reduxSources/actions/authActions";

import Layout from "./containers/Layout";

import "./App.css";

const history = createBrowserHistory();
const store = initStore(history);

if (LocalStorage.get("token")) {
  setAuthToken(LocalStorage.get("token"));
}

const App = () => {
  useEffect(() => {
    store.dispatch(authActions.loadUser());
  }, []);

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Layout />
      </ConnectedRouter>
    </Provider>
  );
};

export default App;
