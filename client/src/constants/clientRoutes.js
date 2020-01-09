import { push } from "connected-react-router/immutable";

export const PATHS = Object.freeze({
  LANDING: "/",

  DEVELOPERS: "/developers",

  REGISTER: "/register",

  LOGIN: "/login",

  DASHBOARD: "/dashboard",

  CREATE_PROFILE: "/create-profile",
  EDIT_PROFILE: "/edit-profile",

  ADD_EXPERIENCE: "/add-experience",
  ADD_EDUCATION: "/add-education"
});

export const ROUTES = Object.freeze({
  LANDING: () => `${PATHS.LANDING}`,

  DEVELOPERS: () => `${PATHS.DEVELOPERS}`,

  REGISTER: () => `${PATHS.REGISTER}`,

  LOGIN: () => `${PATHS.LOGIN}`,

  DASHBOARD: () => `${PATHS.DASHBOARD}`,

  CREATE_PROFILE: () => `${PATHS.CREATE_PROFILE}`,
  EDIT_PROFILE: () => `${PATHS.EDIT_PROFILE}`,

  ADD_EXPERIENCE: () => `${PATHS.ADD_EXPERIENCE}`,
  ADD_EDUCATION: () => `${PATHS.ADD_EDUCATION}`
});

export const ROUTES_ACTIONS = Object.freeze({
  toDashboard: () => push(ROUTES.DASHBOARD()),
  toLogout: () => push(ROUTES.LOGIN())
});
