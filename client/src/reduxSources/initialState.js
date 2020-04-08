import { fromJS } from "immutable";
import { LocalStorage } from "../common/helpers";

const initialState = fromJS({
  modal: {
    isOpen: false,
  },
  alerts: {
    errors: [],
  },
  autentication: {
    token: LocalStorage.get("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
  },
  profile: {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    errors: {},
    delete: {
      loading: true,
      error: {},
    },
  },
  post: {
    post: null,
    posts: [],
    loading: true,
    errors: {},
  },
});

export default initialState;
