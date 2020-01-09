import Axios from "axios";
import { config } from "./api-config";
import { createBrowserHistory } from "history";

// import * as authActions from "../../reduxSources/actions/authActions";
// import { ROUTES_ACTIONS } from "../../constants/clientRoutes";

import initStore from "../../reduxSources/store";

const history = createBrowserHistory();
const store = initStore(history);

const instance = Axios.create({
  baseURL: config.baseURL,
  headers: config.headers
});

// instance.interceptors.response.use(
//   response => response,
//   error => {
//     if (error.response.status === 401) {
//       store.dispatch(authActions.unAutorized());
//       store.dispatch(ROUTES_ACTIONS.toLogout());
//     }
//     return Promise.reject(error);
//   }
// );

export default instance;
