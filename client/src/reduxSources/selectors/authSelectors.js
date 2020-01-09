import { createSelector } from "reselect";

export const authentication = state => state.get("authentication");

export const getIsAuthenticated = createSelector(authentication, auth =>
  auth.get("isAuthenticated")
);

export const getUser = createSelector(authentication, auth => auth.get("user"));

export const getIsLoading = createSelector(authentication, auth =>
  auth.get("loading")
);
